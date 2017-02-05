class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        var current=config.initial;
        this.currentName=current;
        this.currentState=config.states[current];
        this.states=config.states;
        this.initial=config.initial;
        this.historyStateNames=[];
        this.historyStateNames[0]=this.currentName;
        this.arrayCount=0;
        this.historyPosition=0;
       
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentName;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        try {
            if(this.states[state]==undefined) throw Error; 
                if(this.historyPosition<this.arrayCount) {
                    this.arrayCount=this.historyPosition;
                    this.historyStateNames.length=this.arrayCount+1; //удаляем последующую историю, если находимся в середине истории
                } 
                this.arrayCount++;
                this.historyPosition++;

                this.currentState=this.states[state];
                this.currentName=state;
                this.historyStateNames[this.arrayCount]=this.currentName;
            return this.currentName;
        
            }
        catch (Error) {
                alert(Error);
            }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
            try {
                if (this.currentState.transitions[event]==undefined) throw Error;

                if(this.historyPosition<this.arrayCount) {
                this.arrayCount=this.historyPosition;
                this.historyStateNames.length=this.arrayCount+1; //удаляем последующую историю, если находимся в середине истории
                } 
                this.arrayCount++;
                this.historyPosition++;
                var curName=this.currentState.transitions[event];  
                this.currentName=curName;
                this.currentState=this.states[curName];
                this.historyStateNames[this.arrayCount]=this.currentName;
            }
            catch (Error) {
                alert(Error);
            }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        var initial=this.initial;
        this.currentName=initial;
        this.currentState=this.states[initial];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var array =[];
        var count=0;
        if(event) {
            for (var key in this.states) {
                for (var key2 in this.states[key].transitions)
                {
                    if (key2==event) {
                        array[count]=key;
                        count++;
                    }
                }
            }
           return array;
        }
        else {
        return Object.keys(this.states);
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.historyPosition>0) {
            this.historyPosition--;
            this.currentName=this.historyStateNames[this.historyPosition];
            this.currentState=this.states[this.currentName];
            return true;
        }
        else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.historyPosition<this.arrayCount) {
            this.historyPosition++;
           this.currentName=this.historyStateNames[this.historyPosition];
           this.currentState=this.states[this.currentName];
            return true;
        }
        else return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        console.log(this.historyStateNames);
        //обнуляем все счетчики
        this.arrayCount=0;
        this.historyPosition=0;
        this.historyStateNames[this.arrayCount]=this.currentName;
        this.historyStateNames.length=1;
        console.log("this.arrayCount, this.historyPosition", this.arrayCount, this.historyPosition);
        console.log("this.historyStateNames[this.arrayCount]", this.historyStateNames[this.arrayCount]);
        console.log(this.historyStateNames);
        console.log(this.currentState);
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
