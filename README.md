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


### Requirement
* Node.js version 9.11.0
* MongoDB ver 3.6 and above
* Angular CLI
* RabbitMQ Server installed

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
##$ Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
