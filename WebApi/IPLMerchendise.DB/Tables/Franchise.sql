﻿CREATE TABLE Franchise (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Code NVARCHAR(50) UNIQUE NOT NULL,
    City NVARCHAR(100),
    Owner NVARCHAR(100),
    LogoUrl NVARCHAR(255)
);
