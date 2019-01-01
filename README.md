<p align="center">
  <a href="http://votereum.com/">
    <img
      alt="Node.js"
      src="https://raw.githubusercontent.com/jackmercy/CSS-Auth0/master/votereum_full.png"
      width="400"
      style="background-color: #3c5064; border-radius: 10px"
    />
  </a>
</p>

# Votereum: An Ethereum-based E-voting system

  Blockchain, which is the underlying technology of the first cryptocurrency Bitcoin, has drawn a lot of global attention in recent years. Its notable characteristics of distributed ledger, trustless system and immutability not only makes it a disruptive innovation in the electronic payment industry but also potential solutions for other areas that required trust establishment. An electronic voting (E-voting) scheme is a use-case where all attributes of blockchain can offer a mechanism for an open, fair and universal verifiable electoral process. We propose Votereum, an E-voting system that utilizes the blockchain technology. The proposed system is empowered by Ethereum platform, including one server manages the entire system and the other handles all blockchain-related requests. The implementation is also deployed to Rinkeby testing network for evaluation on the feasibility.

---

## Authors
* [Cao Minh Khoi    - 14520432](https://github.com/jackmercy)
  * Email: [14520432@gm.uit.edu.vn](mailto:14520432@gm.uit.edu.vn) or [khoicaominh.mmt@gmail.com](mailto:khoicaominh.mmt@gmail.com)
* [Vo Cao Thuy Linh - 14520473](https://github.com/Dollyns)
  * Email: [14520473@gm.uit.edu.vn](mailto:14520473@gm.uit.edu.vn) or [linhvocaothuy@gmail.com](mailto:linhvocaothuy@gmail.com)

---


### Requirement

* [Nodejs v9](https://nodejs.org/en/download/)
* [MongoDB version 3.6 and above](https://www.mongodb.com/download-center/community)
* [erlang](https://www.erlang.org/downloads)
* [RabbitMQ](https://www.rabbitmq.com/#getstarted)
* [Babel CLI](https://babeljs.io/docs/en/babel-cli) or using npm `npm install --save-dev @babel/core @babel/cli`
* [amqplib](https://github.com/squaremo/amqp.node) or using npm `npm install --save amqplib`
* [Angular CLI](https://cli.angular.io/) or using npm `npm install -g @angular/cli`

### Install

* `npm install`
* Download and install our [OBR server](https://github.com/jackmercy/Votereum-OBR)

-------------

# AS server

#### Development 
* Run `mongod`
* RabbitMQ service is running
* Run `npm start dev` to run AS server.
=> Express server will run at [localhost:5000]()
#### Production
 * RabbitMQ service is running
 * Run `npm start prod` to run AS server.
=> Express server will run at [{Your VM IP}:5000]()
#### Debug

* Kill terminal that run `npm start` then run `npm run debug`
* Using [Node.js V8 --inspector Manager](https://chrome.google.com/webstore/detail/nodejs-v8-inspector-manag/gnhhdgbaldcilmgcpfddgdbkhjohddkj?hl=en) to connect debug port
* Express debug server will run at [localhost:9215]()

---
# Angular UI

#### Development 
* Run `npm run ui`
* Open browser, navigate to [localhost:4200](http://localhost:4200/)

#### Production
* Run `npm run ui-prod`
* Mapping your VM ip to port `8080`
* Open browser, navigate to [{Your VM IP:8080}]()
---
### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).




