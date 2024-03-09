// import * as Network from 'expo-network';

// const getIpAddress = async () => {
//     try {
//         const  ipAddress  = await Network.getIpAddressAsync();
//         console.log('Device IP Address:', ipAddress);
//         return ipAddress
//     } catch (error) {
//         console.error('Error getting IP address:', error);
//     }
// };

// const ipAddress = getIpAddress()

const baseUrl = 'http://192.168.0.185:8080/api/v1';



// const baseUrl = `http://${ipAddress}:8080/api/v1`;

// const backendApi = 'https://www.priders.net/api/v1/';

export default baseUrl;


