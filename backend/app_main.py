from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from backend import models, schemas, crud
from backend.database import engine, Base, get_db

# ---------- DB & APP SETUP ----------

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Ecommerce API")

# CORS: allow Next.js dev server to call FastAPI
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


# ---------- PRODUCT ROUTES ----------

@app.get("/products", response_model=list[schemas.Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = crud.get_products(db=db, skip=skip, limit=limit)
    return products


@app.post("/products", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    db_product = crud.create_product(db=db, product=product)
    return db_product


@app.get("/products/{product_id}", response_model=schemas.Product)
def read_product(product_id: int, db: Session = Depends(get_db)):
    db_product = crud.get_product(db=db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product


# ---------- USER ROUTES (if you use users) ----------

@app.post("/users", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    user_dict = user.dict()
    user_dict["hashed_password"] = get_password_hash(user_dict.pop("password"))
    db_user = crud.create_user(db=db, user_data=user_dict)
    return db_user


@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.put("/products/{product_id}", response_model=schemas.Product)
def update_product(product_id: int, product: schemas.ProductCreate, db: Session = Depends(get_db)):
    db_product = crud.update_product(db=db, product_id=product_id, product=product)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product

@app.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_product(db=db, product_id=product_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"ok": True}



# ---------- ORDER ROUTES (if present in crud/schemas) ----------

# @app.post("/orders", response_model=schemas.Order)
# def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
#     db_order = crud.create_order(db=db, order=order)
#     return db_order


# @app.get("/orders/{order_id}", response_model=schemas.Order)
# def read_order(order_id: int, db: Session = Depends(get_db)):
#     db_order = crud.get_order(db=db, order_id=order_id)
#     if db_order is None:
#         raise HTTPException(status_code=404, detail="Order not found")
#     return db_order


# ---------- ROOT ----------

@app.get("/")
def root():
    return {"message": "Ecommerce API is running"}
