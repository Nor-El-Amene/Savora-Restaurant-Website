<!DOCTYPE html>
<html>
<head>
    <title>Admin - Manage Menu</title>
    <style>
        body { font-family: sans-serif; padding: 20px; background: #f4f4f4; }
        form { background: white; padding: 20px; border-radius: 8px; max-width: 400px; }
        input, select { display: block; width: 100%; margin-bottom: 10px; padding: 8px; }
    </style>
</head>
<body>
    <h2>Add New Menu Item</h2>
    <form action="process_menu.php" method="POST">
        <input type="text" name="name" placeholder="Item Name (e.g., Sea Combo)" required>
        
        <select name="category">
            <option value="burger">Burger</option>
            <option value="pizza">Pizza</option>
            <option value="drink">Drink</option>
            <option value="dessert">Dessert</option>
            <option value="plate">Plate</option>
        </select>

        <input type="number" step="0.01" name="price" placeholder="Price (e.g., 9.99)" required>
        <input type="number" name="count" placeholder="Stock Count (e.g., 11)" required>
        <input type="text" name="image" placeholder="Image Filename (exactly as in folder)" required>
        
        <button type="submit" style="background: orange; color: white; border: none; padding: 10px 20px; cursor: pointer;">Add Item</button>
    </form>
</body>
</html>