module.exports = {
  mongoURI: 'mongodb://zzaz3:ker1beros@ds229648.mlab.com:29648/skynet'
  // mongoURI: process.env.MONGO_URI
  // mongoURI: 'mongodb://localhost/omegadot-dev'
}

if(process.env.NODE_ENV === "production"){
  module.exports = {mongoURI: "mongodb://zzaz3:ker1beros@ds259109.mlab.com:59109/skynet-prod"}
} else {
  module.exports = {mongoURI: 'mongodb://zzaz3:ker1beros@ds229648.mlab.com:29648/skynet'} 
}