from sqlalchemy import create_engine

from status import Base


engine = create_engine('sqlite:///data.db', echo=False)

Base.metadata.create_all(engine)
