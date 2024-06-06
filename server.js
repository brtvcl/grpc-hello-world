import grpc from '@grpc/grpc-js';
import path from 'path';
import protoLoader from '@grpc/proto-loader';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const packageDefinition = protoLoader.loadSync(path.join(__dirname, 'services.proto'), { defaults: true });
console.log(packageDefinition);
const demoPackage = grpc.loadPackageDefinition(packageDefinition).demo;

function sayHello(call, callback) {
  const name = call.request.name;
  callback(null, { message: 'Hello, ' + name });
}

function startServer() {
  const server = new grpc.Server();
  server.addService(demoPackage.Greeter.service, { SayHello: sayHello });
  server.bindAsync('localhost:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Server listening on port 50051');
  });
}

startServer();
