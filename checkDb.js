const { MongoClient} = require('mongodb')

async function showDataBase(client){
    const dataList = await client.db().admin().listDatabases();
    console.log('dbs', dataList)
     dataList.databases.forEach(db=> console.log(` -${db.name}`))
}
