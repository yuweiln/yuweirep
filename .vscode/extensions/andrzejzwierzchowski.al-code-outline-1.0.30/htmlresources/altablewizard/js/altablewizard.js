class TableWizard {

    constructor() {
        //initialize properties
        this._step = 1;
        this._vscode = acquireVsCodeApi();

        //initialize controls
        this._fieldsgrid = new AZGridView('fieldsgrid', 
            [{name: 'id', caption: 'Id', style: 'width: 80px;'},
            {name: 'name', caption: 'Name', style: 'width: 60%;'},
            //{name: 'caption', caption: 'Caption', style: 'width: 30%'},
            {name: 'dataType', caption: 'Data Type', style: 'width: 150px', autocomplete: [                
                'Blob', 'Boolean', 'Code', 'Date', 'DateFormula', 'DateTime', 'Decimal', 'Duration',
                'Enum', 'Guid', 'Integer', 'Media', 'MediaSet', 'Option', 'RecordId', 'TableFilter',
                'Text', 'Time']},
            {name: 'dataClassification', caption: 'Data Classification', style: 'width: 250px', autocomplete: [
                'AccountData', 'CustomerContent', 'EndUserIdentifiableInformation', 'EndUserPseudonymousIdentifiers',
                'OrganizationIdentifiableInformation', 'SystemMetadata', 'ToBeClassified']},
            {name: 'length', caption: 'Length', style: 'width:100px'}],
            undefined, undefined, 'Loading data...', true);

        // Handle messages sent from the extension to the webview
        var me = this;
        window.addEventListener('message', event => {
            me.onMessage(event.data);
        });

        this.sendMessage({
            command: 'documentLoaded'
        });
    }

    onMessage(message) {     
        switch (message.command) {
            case 'setData':
                this.setData(message.data);
                break;
        }
    }

    sendMessage(data) {
        this._vscode.postMessage(data);    
    }

    setData(data) {
        this._data = data;        
       
        if (this._data) {
            //initialize inputs
            $("#objectid").val(this._data.objectId);
            $("#objectname").val(this._data.objectName);
            //initialize fields list
            if (this._data.fields)
                this._fieldsgrid.setData(this._data.fields);
            else
                this._fieldsgrid.setData([]);
        }

    }
   
    onFinish() {
        this.collectStepData(true);

        if (!this.canFinish())
            return;
            
        this.sendMessage({
            command: "finishClick",
            data: {
                objectId : this._data.objectId,
                objectName : this._data.objectName,
                fields: this._data.fields
            }
        });
    }

    onCancel() {
        this.sendMessage({
            command : "cancelClick"
        })
    }

    collectStepData(finishSelected) {
        this._data.objectId = $("#objectid").val();
        this._data.objectName = $("#objectname").val();        
        this._data.fields = this._fieldsgrid.getData();
    }

    canFinish() {
        if ((!this._data.objectName) || (this._data.objectName == '')) {
            this.sendMessage({
                command: 'showError',
                message: 'Please enter object name.'
            });
            return false;
        }
        return true;
    }

}

var wizard;

$(function() {
    wizard = new TableWizard();
});
