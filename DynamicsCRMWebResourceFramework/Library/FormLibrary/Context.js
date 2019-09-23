
debugger;
const xrm = window.Xrm || window.parent.Xrm;
var xrmpage = xrm.Utility;
var xrmcontext = xrmpage.getGlobalContext();


module.exports = class CrmContext {
    constructor() {
        this.xrmClient = new XrmClient();
    }

    getClient() {
        return this.xrmClient.GetXrmClient();
    }

    getClientState() {
        return this.xrmClient.GetXrmClientState();
    }
    getFormFactor() {
        let value = this.xrmClient.GetXrmFormFactor();
        switch (value) {
            case 0:
                return FormFactors.Unknown;
            case 1:
                return FormFactors.Desktop;
            case 2:
                return FormFactors.Tablet;
            case 3:
                return FormFactors.Phone;
        }
    }

    getClientUrl() {
        return xrmcontext.getClientUrl();
    }

    getCurrentTheme() {
        return xrmcontext.getCurrentTheme();
    }

    getIsAutoSaveEnabled() {
        return xrmcontext.getIsAutoSaveEnabled();
    }

    getOrgLcid() {
        return xrmcontext.getOrgLcid();
    }

    getOrgUniqueName() {
        return xrmcontext.getOrgUniqueName();
    }

    getQueryStringParameters() {
        return xrmcontext.getQueryStringParameters();
    }
    getVersion() {
        return xrmcontext.getVersion();
    }
}

class XrmClient {

    GetXrmClient() {
        return xrmcontext.client.getClient();
    }

    GetXrmClientState() {
        return xrmcontext.client.getClientState();
    }
    GetXrmFormFactor() {
        return xrmContext.client.getFormFactor();
    }
}

class UserDetail {

    constructor() {
        this.UserId = null;
        this.UserLcid = null;
        this.UserName = null;
        this.UserRoles = [];
        this.User = null;
    }

    Initialize() {
        if (xrmcontext === undefined || xrmcontext === null) {
            console.log("No XRM Context is available!");
            return false;
        }
        this.GetXrMUserId();
        this.GetXrMUserLcid();
    }

    GetXrMUserId() {
        this.UserId = xrmcontext.getUserId();
        return this.UserId;
    }

    GetXrMUserLcid() {
        this.UserLcid = xrmcontext.getUserLcid();
    }

    GetXrmUserDetail(userId){
        const query = "api/data/v9.1/systemusers(" + userId + ")";

    }
}

const FormFactors = {
    Unknown: "Unknown",
    Desktop: "Desktop",
    Tablet: "Tablet",
    Phone: "Phone"
};