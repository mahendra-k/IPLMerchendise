CREATE VIEW [dbo].[ProductDetailsView]
	AS SELECT 
    P.Id,
    P.Name,
    p.Description,
    P.Price,
    P.ProductType,
    P.ImageUrl,
    F.Name AS FranchiseName,
    F.Code AS FranchiseCode
FROM Product p
INNER JOIN Franchise f ON P.FranchiseId = F.Id
WHERE P.IsActive = 1
