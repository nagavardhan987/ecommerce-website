from pydantic import BaseModel


# --------- PRODUCT SCHEMAS ---------

class ProductBase(BaseModel):
    name: str
    description: str | None = None
    price: float
    stock: int
    image_url: str | None = None


class ProductCreate(ProductBase):
    pass


class Product(ProductBase):
    id: int

    class Config:
        orm_mode = True


# --------- USER SCHEMAS (optional) ---------

class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


# --------- ORDER SCHEMAS (optional) ---------

class OrderBase(BaseModel):
    product_id: int
    quantity: int


class OrderCreate(OrderBase):
    pass


class Order(OrderBase):
    id: int

    class Config:
        orm_mode = True
