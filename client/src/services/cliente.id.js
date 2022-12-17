export default function clientId() {
    const client = JSON.parse(localStorage.getItem('client'));
  
    if (client.id) {
      return {id: client.id };
    } else {
      return {};
    }
  }