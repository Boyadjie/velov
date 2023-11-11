# velo'v

### React application with a NodeJS backend and a MongoDB database

Project structure:
```
.
├── velov-app (frontend)
│   ...
│
├── velov-serv (backend)
│   ...
└── README.md
```

## How to work with it

⚠️ You will need to initialize mongoDb on your computer
If you are on mac, you can do that by running this following commands :

```bash
  brew tap mongodb/brew
```
```bash
  brew install mongodb-community
```
```bash
  brew services start mongodb/brew/mongodb-community
```

Next you can simply go to the folder velov-serv with ```cd velov-serv``` and run ```npm i``` then ```npm run serv```.

On another terminal you can now run the frontend by doing ```cd velov-app``` and then ```npm i``` and finally ```npm run dev```

### You should be good to go !
