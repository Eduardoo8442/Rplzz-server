export default function getDate() {
const dateNow = new Date();
const day = String(dateNow.getDate()).padStart(2, '0'); 
const month = String(dateNow.getMonth() + 1).padStart(2, '0');
const year = dateNow.getFullYear();

return `${day}/${month}/${year}`;
}