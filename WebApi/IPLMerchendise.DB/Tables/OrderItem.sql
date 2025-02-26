﻿    CREATE TABLE [dbo].[OrderItem] (
        Id INT PRIMARY KEY IDENTITY(1,1),
        OrderId INT NOT NULL FOREIGN KEY REFERENCES [Order](Id),
        ProductId INT NOT NULL FOREIGN KEY REFERENCES [Product](Id),
        Quantity INT NOT NULL,
        CurrencyCode CHAR(10) NOT NULL,
        Price DECIMAL(18,2) NOT NULL
    );
