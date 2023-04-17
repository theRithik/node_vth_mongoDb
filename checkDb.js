const { MongoClient} = require('mongodb')

async function showDataBase(client){
    const dataList = await client.db().admin().listDatabases();
    console.log('dbs', dataList)
     dataList.databases.forEach(db=> console.log(` -${db.name}`))
}

module.exports = async function connectToMongoDB(){
    const url =  'mongodb://127.0.0.1:27017/'
    const client = new MongoClient(url);

    await client.connect()
    await showDataBase(client)
    await client.close()
} 
