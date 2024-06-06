import path from 'path';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const packageDefinition = protoLoader.loadSync(path.join(__dirname, 'services.proto'), { defaults: true });
const demoPackage = grpc.loadPackageDefinition(packageDefinition).demo;

const client = new demoPackage.Greeter('localhost:50051', grpc.credentials.createInsecure()); // Replace with actual server address

const name = 'World';

client.sayHello({ name: {} }, (error, response) => {
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Greeting:', response.message);
  }
});
