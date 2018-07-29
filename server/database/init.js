const mongoose = require('mongoose');
const db = 'mongodb://localhost/douban_reailer';

mongoose.Promise = global.Promise;

exports.connect = () => {
    let maxConnectTimes = 0;
    return new Promise((resolve, reject)=>{
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }
    
        mongoose.connect(db);
    
        mongoose.connection.on('disconnected', () => {
            maxConnectTimes++;
            if(maxConnectTimes < 5){
                mongoose.connect(db);
            }else{
                throw new Error('数据库出问题了');
            }
        });
    
        mongoose.connection.on('error', (err) => {
            maxConnectTimes++;
            if(maxConnectTimes < 5){
                mongoose.connect(db);
            }else{
                throw new Error('数据库出问题了');
            }
        });
    
        mongoose.connection.on('open', () => {
            const Dog = mongoose.model('Dog',{name: String});
            const doga = new Dog({name: '小狗a'});
            doga.save().then(()=>{
                console.log('汪汪')
            })
            resolve();
            console.log('successfully');
        })
    })
}