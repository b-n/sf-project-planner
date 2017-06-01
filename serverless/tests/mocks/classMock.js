import { stub, spy } from 'sinon';
import 'sinon-as-promised';

class ClassMock {

    constructor(listOfStubs) {
        this.stubs = {};
        this.listOfStubs = listOfStubs;
    }

    getMock(stubs) {

        const stubOptions = stubs === undefined || !stubs ? {} : stubs;

        this.listOfStubs.map(name => {
            const stubObj = {
                resolves: true,
                value: null,
                ...stubOptions[name]
            };

            this.setStub(name, stubObj.resolves, stubObj.value);
        });

        const mockObj = this.listOfStubs.reduce((accumulator, currentValue) => {
            return {
                ...accumulator,
                [ currentValue ] : this.getStub(currentValue)
            };
        }, {});

        return spy(() => {
            return mockObj;
        });
    }

    setStub(name, resolves, value) {
        this.stubs[name] = resolves ? stub().resolves(value) : stub().rejects(value);
    }

    getStub(name) {
        return this.stubs[name];
    }

}

export default ClassMock;
