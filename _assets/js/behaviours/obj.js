export function obj1(container) {
    this.add('obj1');
    this.on('obj1:test', function() {
        console.log('obj1:test');
    })
}

export function obj2(container) {
    this.add('obj2');
    const obj1 = this.get('obj1');
    obj1.trigger('obj1:test');
    const value = obj1.getState('test');
}

export function obj3(container) {
    this.add('obj3');
    this.on('obj3:test', function() {
        console.log('obj1:test');
    })
}