class Config(object):
    DEBUG = False
    TESTING = False


class DevelopmetConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///case_study.sqlite3'
