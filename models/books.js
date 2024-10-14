import query from '../config/db.js';

const createBooksTable = async () => {
    const sqlStr = `
    CREATE TABLE IF NOT EXISTS books(
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image BLOB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
    try {
        await query(sqlStr);
        console.log('Books table is successfully created');
    } catch (err) {
        console.error(err);
        return null;
    }
};

export default createBooksTable;
