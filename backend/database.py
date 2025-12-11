from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# MySQL connection string - UPDATE with your credentials
# Example for default MySQL setup:
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://ecom_user:G0disgr8!!@127.0.0.1/ecommerce_db"



engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
