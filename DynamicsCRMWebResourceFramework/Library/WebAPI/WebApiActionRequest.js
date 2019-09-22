const xrmContext = window.Xrm || window.parent.Xrm;
const globalContext = xrmContext.Utility.getGlobalContext();

class CommandExecutor {
    executeCommand(commandName, parameter) {
        const entity = {
            im_action: commandName,
            im_parameter: JSON.stringify(parameter)
        };

        const request = {
            url: this._buildODataUrl(entity.im_action),
            method: "POST",
            data: entity.im_parameter,
            contentType: "application/json; charset=utf-8",
            headers: { Accept: "application/json", Prefer: "return=representation" },
            dataType: "json",
            async: true,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("OData-MaxVersion", "4.0");
                XMLHttpRequest.setRequestHeader("OData-Version", "4.0");
                XMLHttpRequest.setRequestHeader("Accept", "application/json");
            }
        };

        return $.ajax(request).then(response => {
            if (response === null || response.data === null)
                throw new Error("No command result available");

            return JSON.parse(response.data);
        });
    }

    _buildODataUrl(query) {
        const baseUrl = globalContext.getClientUrl() + "/api/data/v9.1/";
        return baseUrl + query;
    }
}