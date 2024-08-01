export default function generateId(): string {
    let id = '';
    const digits = '0123456789';
    
    for (let i = 0; i < 14; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        id += digits[randomIndex];
    }
    
    return id;
}
