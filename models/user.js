import query from '../config/db.js';

const createUserTable = async () => {
    const sqlStr = `
    CREATE TABLE IF NOT EXISTS users(
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
    try {
        await query(sqlStr);
        console.log('User table is successfully created');
    } catch (err) {
        console.error(err);
        return null;
    }
};

export default createUserTable;
