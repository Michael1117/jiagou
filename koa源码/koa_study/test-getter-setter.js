const kaikeba = {
    info: {
        name: '开课吧',
        desc: '开课吧真不错'
    },
    getName(){
        return this.info.name
    },
    setName(val){
        console.log('new name is ' + val);
        this.info.name = val;
    }
};

console.log(kaikeba.getName());
kaikeba.setName('Michael');
console.log(kaikeba.getName());
//console.log(kaikeba.name);

kaikeba.name = 'kkb';

console.log(kaikeba.name);