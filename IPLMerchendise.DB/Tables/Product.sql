CREATE TABLE [dbo].[Product]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	Name NVARCHAR(255) NOT NULL,             
    Description NVARCHAR(1000),       
    CurrencyCode INT NOT NULL,
    Price DECIMAL(18, 2) NOT NULL,     
    ProductType NVARCHAR(100) NOT NULL,           
    FranchiseID INT NOT NULL,             
    ImageUrl NVARCHAR(255) NOT NULL,          
    StockQuantity INT NOT NULL,                
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NOT NULL DEFAULT GETDATE(),
)
