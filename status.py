from datetime import datetime

from sqlalchemy import Column, Integer, Enum, DateTime
from sqlalchemy.ext.declarative import declarative_base

from constants import STATUS_CHOICES
from utils import datetime_to_timestamp


Base = declarative_base()


class Status(Base):
    __tablename__ = 'statuses'

    id = Column(Integer, primary_key=True)
    message = Column(Enum(*STATUS_CHOICES))
    timestamp = Column(DateTime, default=datetime.utcnow)

    def serialize(self):
        return {
            'id': self.id,
            'message': self.message,
            'timestamp': datetime_to_timestamp(self.timestamp)
        }

    def __repr__(self):
        return "<Status(status='%s', timestamp='%s'" % (
            self.message, self.timestamp.isoformat())
