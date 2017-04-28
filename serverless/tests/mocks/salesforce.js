import { stub, spy } from 'sinon';
import 'sinon-as-promised';

class SalesforceMock {

    constructor() {
        this.stubs = {};
    }

    getMock(options) {
        const optionsObj = {
            failStubs : [],
            ...options
        };

        const { failStubs } = optionsObj;

        const failStubList = failStubs === undefined || !failStubs ? [] : failStubs;

        this.listStubs().map(name => {
            const isFailStub = failStubList.filter(stubName => stubName === name);

            this.setStub(name, !isFailStub);
        });


        const mockObj = this.listStubs().reduce((accumulator, currentValue) => {
            return {
                ...accumulator,
                [ currentValue ] : this.getStub(currentValue)
            };
        }, {});

        return spy(() => {
            return mockObj;
        });
    }

    setStub(name, resolves) {
        this.stubs[name] = resolves ? stub().resolves() : stub().rejects();
    }

    getStub(name) {
        return this.stubs[name];
    }

    listStubs() {
        return [ 'login', 'query', 'forgotPassword', 'resourceUpdate' ];
    }

}

export default SalesforceMock;
