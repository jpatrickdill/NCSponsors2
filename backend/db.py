from sqlalchemy import create_engine

engine = create_engine(
    "postgresql://nduqconefiijtg:d3d287427e8f01103f69f2e16f1d5c3a5675b63b327446ec5bd2ba37712cf647@ec2-54-160-109-68.compute-1.amazonaws.com:5432/d77tqh34m1sfpf"
)
db = engine
