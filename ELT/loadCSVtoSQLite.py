import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy import create_engine, MetaData, PrimaryKeyConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Numeric, Text, Float


csvfilesUS = ["./Resources/US/us_percentage.csv", "./Resources/US/generation-major-source.csv"]
csvfilesWorld = ["./Resources/World/number-without-electricity-by-region.csv", "./Resources/World/renewable-energy-gen.csv", "./Resources/World/renewable_energy_consumption.csv"]
engine = create_engine("sqlite:///US_Energy_DB.sqlite")
conn = engine.connect()

###
# Use SQLAlchemy to model table schema
###
Base = declarative_base()

## US ##
class PercentUS(Base):
    __tablename__ = 'us_percentage'

    id = Column(Integer, primary_key=True)
    State = Column(Text)
    Nuclear = Column(Integer)
    Coal = Column(Integer)
    Natural_Gas = Column(Integer)
    Petroleum = Column(Integer)
    Hydro = Column(Integer)
    Geothermal = Column(Integer)
    Solar_PV = Column(Integer)
    Wind = Column(Integer)
    Biomass_and_Other = Column(Integer)

class us_generation_power(Base):
    __tablename__ = 'us_generation'

    # Power in billion kilowatthours
    id = Column(Integer, primary_key=True)
    year = Column(Integer)
    coal = Column(Integer)
    natural_gas = Column(Integer)
    nuclear = Column(Integer)
    renewables = Column(Integer)
    petroleum_and_other = Column(Integer)


## World ##
class NumbNoElectricity(Base):
    __tablename__ = 'world_no_electricity'
  
    id = Column(Integer, primary_key=True)
    Country = Column(Text)
    Code = Column(Text)
    Year = Column(Integer)
    Number_people_without_electricity = Column(Integer)


class worldGeneration(Base):
    __tablename__ = 'world_generation'
    
    # Power measured in TWh
    id = Column(Integer, primary_key=True)
    Country = Column(Text)
    Code = Column(Text)
    Year = Column(Integer)
    Solar = Column(Integer)
    Wind = Column(Integer)
    Hydro = Column(Integer)
    Geo_Biomass_Other = Column(Integer)
    

class worldConsumption(Base):
    __tablename__ = 'world_consumption'
    
    # Power measured in TWh
    id = Column(Integer, primary_key=True)
    Country = Column(Text)
    Code = Column(Text)
    Year = Column(Integer)
    Traditional_biomass = Column(Integer)
    Hydro = Column(Integer)
    Solar = Column(Integer)
    Wind = Column(Integer)
    Geo_Biomass_Other = Column(Integer)

    # def __repr__(self):
    #     return f"id={self.id}, name={self.title}"


Base.metadata.create_all(engine)
metadata = MetaData(bind=engine)
metadata.reflect()

###
# Use Pandas to read csv into a list of row objects
###
df = pd.read_csv(csvfilesUS[0], dtype=object)
percent_us_data = df.to_dict(orient='records')
###
df = pd.read_csv(csvfilesUS[1], dtype=object)
generation_us_data = df.to_dict(orient='records')
###
###
df = pd.read_csv(csvfilesWorld[0], dtype=object)
no_electricity_world_data = df.to_dict(orient='records')
###
df = pd.read_csv(csvfilesWorld[1], dtype=object)
generation_world_data = df.to_dict(orient='records')
###
df = pd.read_csv(csvfilesWorld[2], dtype=object)
consumption_world_data = df.to_dict(orient='records')



###
# Insert data into table using SQLAlchemy
###
percent_us_table = sqlalchemy.Table('us_percentage', metadata, PrimaryKeyConstraint('id'),
                            autoload=True, extend_existing=True)
generation_us_table = sqlalchemy.Table('us_generation', metadata, PrimaryKeyConstraint('id'),
                            autoload=True, extend_existing=True)
###
no_electricity_world_table = sqlalchemy.Table('world_no_electricity', metadata, PrimaryKeyConstraint('id'),
                            autoload=True, extend_existing=True)
generation_world_table = sqlalchemy.Table('world_generation', metadata, PrimaryKeyConstraint('id'),
                            autoload=True, extend_existing=True)
consumption_world_table = sqlalchemy.Table('world_consumption', metadata, PrimaryKeyConstraint('id'),
                            autoload=True, extend_existing=True)                            

###
conn.execute(percent_us_table.delete())
conn.execute(percent_us_table.insert(), percent_us_data)

conn.execute(generation_us_table.delete())
conn.execute(generation_us_table.insert(), generation_us_data)
###
conn.execute(no_electricity_world_table.delete())
conn.execute(no_electricity_world_table.insert(), no_electricity_world_data)

conn.execute(generation_world_table.delete())
conn.execute(generation_world_table.insert(), generation_world_data)

conn.execute(consumption_world_table.delete())
conn.execute(consumption_world_table.insert(), consumption_world_data)
