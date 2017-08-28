/*function Observer(data){
	this.data = data;
	this.walk();
}
Observer.prototype = {
	walk: function(){
		var that = this;
		var data = that.data;
		Object.keys(data).forEach(function(key){
			that.convert(key, data[key]);
		})
	},
	convert: function(key, val){
		this.defineReactive(key, val);
	},
	defineReactive: function(key, val){
		var that = this;
		var dep = new Dep();
		observer(val);
		Object.defineProperty(that.data,key,{
			enumberable: true,
			configurable: false,
			get: function(){
				console.log("访问了" + key + "的值" + val);
				if(Dep.target){
					dep.addSub(Dep.target);
				}
				return val;
			},
			set: function(newVal){
				if(newVal === val){
					return;
				}
				val = newVal;
				observer(newVal);
				//that.data[key] = newVal;
				dep.notify();
			}
		})
	},
	update: function(){}
}

function observer(data){
	if(data.constructor === Object){
		return new Observer(data);
	}
}

//订阅器
function Dep(){
	this.subs = [];
}
Dep.prototype = {
	addSub: function(eventName){
		this.subs.push(eventName);
	},
	notify: function(){
		this.subs.forEach(function(eventName){
			eventName.update();
		})
	}
};

Dep.target = null;*/


function Observer(data) {
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk: function(data) {
        var me = this;
        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        });
    },
    convert: function(key, val) {
        this.defineReactive(this.data, key, val);
    },

    defineReactive: function(data, key, val) {
        var dep = new Dep();
        var childObj = observe(val);

        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
                if (Dep.target) {
                    dep.depend();
                }
                console.log("访问了" + key + "的值" + val);
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        });
    }
};

function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }

    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },

    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

Dep.target = null;