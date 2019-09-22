window.gulls = window.gulls || {};
window.gulls.odata = window.gulls.odata || {};

window.gulls.odata.Request = class {
    constructor(xrm) {
        this.xrmContext = new CrmContext();
        this.odataUrl = this.xrmContext.getClientUrl() + this.getVersion();
    }

    getVersion() {
        let value = this.xrmContext.getVersion().substring(0, 3);
        switch (value) {
            case 8.2:
                return "/api/data/v8.2/";
            case 9.1:
                return "/api/data/v9.1/";
            case 9.0:
                return "/api/data/v9.0/";
            case 8.1:
                return "/api/data/v8.1/";
            case 8.0:
                return "/api/data/v8.0/";
        }
    }

    _handleResult(data, textStatus, jqXhr, callback) {
        let obj = null;
        if (data && data.d) {
            obj = data.d;

            if (obj.results)
                obj = obj.results;
        }
        if (typeof callback === "function")
            callback(obj, textStatus, jqXhr);
        return obj;
    }

    retrieve(query) {
        const request = {
            url: this.odataUrl + query,
            type: 'GET',
            async: true,
            contentType: "application/json; charset=utf-8",
            headers: { Accept: "application/json", Prefer: "odata.include-annotations=OData.Community.Display.V1.FormattedValue" },
            dataType: 'json'
        };

        $.ajax(request).then((data, textStatus, jqXhr) => {
            this._handleResult(data, textStatus, jqXhr, (_data) => {
                deferred.resolve(_data, textStatus, jqXhr);
            }, deferred.reject);
        }), deferred.reject;
        return deferred.promise();
    }

    create(entity, entitySchemaName) {
        const request = {
            url: this.odataUrl + entitySchemaName,
            type: 'POST',
            async: true,
            data: JSON.stringify(entity),
            contentType: "application/json; charset=utf-8",
            headers: { Accept: "application/json", Prefer: "odata.include-annotations=OData.Community.Display.V1.FormattedValue" },
            dataType: 'json'
        };

        $.ajax(request).then((data, textStatus, jqXhr) => {
            this._handleResult(data, textStatus, jqXhr, (_data) => {
                deferred.resolve(_data, textStatus, jqXhr);
            }, deferred.reject);
        }), deferred.reject;
        return deferred.promise();
    }

    deleteEntity(id, entitySchemaName) {
        ///<summary>Deletes the specified record.</summary>
        /// <param name="id" type="String">The record id.</param>
        /// <param name="entitySchemaName" type="String">The schema name of the entity to be deleted.</param>
        var command = this.odataUrl + entitySchemaName + "(" + id + ")";
        const request = {
            url: command,
            type: 'DELETE',
            contentType: "application/json; charset=utf-8",
            headers: { Accept: "application/json", "X-HTTP-Method": "DELETE" },
            dataType: 'json'
        };

        $.ajax(request).then((data, textStatus, jqXhr) => {
            this._handleResult(data, textStatus, jqXhr, (_data) => {
                deferred.resolve(_data, textStatus, jqXhr);
            }, deferred.reject);
        }), deferred.reject;
        return deferred.promise();
    }

    updateEntity(entity, id, entitySchemaName, sync) {
        /// <summary>Updates a given record.</summary>
        /// <param name="entity" type="Object">The json based entity to be updated.</param>
        /// <param name="id" type="String">The id of the entity to be updated.</param>
        /// <param name="entitySchemaName" type="String">The schema name of the entity to be updated.</param>
        /// <param name="sync" type="Boolean">Indicates that the request should be executed synchronously.</param>
        /// <returns type="jQuery.jqXHR">jqXHR</returns>
        var self = this;
        var result;
        var response = $.ajax({
            type: "PATCH",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            url: this.odataUrl + entitySchemaName + "(" + id + ")",
            data: JSON.stringify(entity),
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("OData-MaxVersion", "4.0");
                XMLHttpRequest.setRequestHeader("OData-Version", "4.0");
                XMLHttpRequest.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
            },
            async: !sync,
            success: sync &&
                function (data, textStatus, jqXhr) {
                    self._handleResult(data, textStatus, jqXhr, function (obj) { result = obj; });
                },
            error: sync &&
                function (jqXhr, textStatus, errorThrown) { self._handleError(jqXhr, textStatus, errorThrown); },
            headers: { Accept: "application/json", "X-HTTP-Method": "MERGE", Prefer: "odata.include-annotations=OData.Community.Display.V1.FormattedValue" },
            dataType: 'json'
        });

        if (!sync) {
            var dfd = $.Deferred();
            response.done(function (data, textStatus, jqXhr) {
                self._handleResult(data, textStatus, jqXhr, dfd.resolve);
            });
            response.fail(function (jqXhr, textStatus, errorThrown) {
                dfd.reject(errorThrown, textStatus, jqXhr);
            });
            result = dfd.promise();
        }
        return result;
    }

    associate(parentId, parentType, relationshipName, childId, childType) {
        /// <summary>Associates N:N entity relationship records.</summary>
        /// <param name="parentId" type="String">
        /// The Id of the record to be the parent record in the relationship
        /// </param>
        ///<param name="parentType" type="String">
        /// The Schema Name of the Entity type for the parent record.
        /// For an Account record, use "Account"
        /// </param>
        ///<param name="relationshipName" type="String">
        /// The Schema Name of the Entity Relationship to use to associate the records.
        /// To associate account records as a Parent account, use "Referencedaccount_parent_account"
        /// </param>
        ///<param name="childId" type="String">
        /// The Id of the record to be the child record in the relationship
        /// </param>
        ///<param name="childType" type="String">
        /// The Schema Name of the Entity type for the child record.
        /// For an Account record, use "Account"
        /// </param>
        var self = this;
        var jsonEntity =
            window.JSON.stringify({ "uri": this.odataUrl + childType + "Set(guid'" + childId + "')" });

        var command = this.odataUrl + parentType + "Set(guid'" + parentId + "')/$links/" + relationshipName;
        var response = $.ajax({
            url: command,
            type: 'post',
            async: true,
            data: jsonEntity,
            contentType: "application/json; charset=utf-8",
            headers: { Accept: "application/json" },
            dataType: 'json'
        });

        var dfd = $.Deferred();
        response.done(function (data, textStatus, jqXhr) {
            self._handleResult(data, textStatus, jqXhr, dfd.resolve);
        });
        response.fail(function (jqXhr, textStatus, errorThrown) {
            dfd.reject(errorThrown, textStatus, jqXhr);
        });

        return dfd.promise();
    }

    disassociate(parentId, parentType, relationshipName, childId) {
        /// <summary>Disassociates N:N entity relationship records.</summary>
        /// <param name="parentId" type="String">
        /// The Id of the record to be the parent record in the relationship
        /// </param>
        ///<param name="parentType" type="String">
        /// The Schema Name of the Entity type for the parent record.
        /// For an Account record, use "Account"
        /// </param>
        ///<param name="relationshipName" type="String">
        /// The Schema Name of the Entity Relationship to use to associate the records.
        /// To associate account records as a Parent account, use "Referencedaccount_parent_account"
        /// </param>
        ///<param name="childId" type="String">
        /// The Id of the record to be the child record in the relationship
        /// </param>
        var self = this;

        var command = this.odataUrl +
            parentType +
            "Set(guid'" +
            parentId +
            "')/$links/" +
            relationshipName +
            "(guid'" +
            childId +
            "')";
        var response = $.ajax({
            url: command,
            type: 'DELETE',
            async: true,
            contentType: "application/json; charset=utf-8",
            headers: { Accept: "application/json", "X-HTTP-Method": "DELETE" },
            dataType: 'json'
        });

        var dfd = $.Deferred();
        response.done(function (data, textStatus, jqXhr) {
            self._handleResult(data, textStatus, jqXhr, dfd.resolve);
        });
        response.fail(function (jqXhr, textStatus, errorThrown) {
            dfd.reject(errorThrown, textStatus, jqXhr);
        });

        return dfd.promise();
    }
};


window.gulls.odata.webapi = class {
    constructor(xrm) {
        this.xrmContext = new CrmContext();
        this.odataUrl = this.xrmContext.getClientUrl() + this.getVersion();
    }

    getVersion() {
        let value = this.xrmContext.getVersion().substring(0, 3);
        switch (value) {
            case 8.2:
                return "/api/data/v8.2/";
            case 9.1:
                return "/api/data/v9.1/";
            case 9.0:
                return "/api/data/v9.0/";
            case 8.1:
                return "/api/data/v8.1/";
            case 8.0:
                return "/api/data/v8.0/";
        }
    }


    create(entitySchemaName, entity) {
        xrm.WebApi.createRecord("account", newRecord)
            .then(function (result) {
                var newRecordId = result.id;
                //Handle scenario when record is created successfully
            }).fail(function (error) {
                var message = error.message;
                //Add handling of error that occurred
            });
    }

    update(entityScemaName, UpdateRecord, id) {
        xrm.WebApi.createRecord("account", id, UpdateRecord)
            .then(function (result) {
                return result;
            }).fail(function (error) {
                var message = error.message;
                //Add handling of error that occurred
            });
    }

    delete(entitySchemaname, id) {
        xrm.WebApi.deleteRecord(entitySchemaname, id)
            .then(function (result) {
                //Handle scenario when record was deleted =
                return result;
            })
            .fail(function (error) {
                var message = error.message;
                //Add handling of error that occurred
            });
    }

    retrieve(entitySchemaname, id, options) {

        xrm.WebApi.retrieveRecord(entitySchemaname, id, options)
            .then(function (result) {
                return result;
                //Handle retrieved data
            })
            .fail(function (error) {
                var message = error.message;
                //Add handling of error that occurred
            });
    }

    retrieveMultiple(entitySchemaname, Query, options) {
        xrm.WebApi.retrieveMultipleRecords(entitySchemaname, Query, options)
            .then(function (result) {
                return result;
            })
            .fail(function (error) {
                var message = error.message;
                //Add handling of error that occurred
            });
    }

    execute(request) {
        xrm.WebApi.execute(request)
            .then(function (result) {
                return result;
                //Handle retrieved data
            })
            .fail(function (error) {
                var message = error.message;
                //Add handling of error that occurred
            });
    }

    executemultiple(request) {
        xrm.WebApi.executeMultiple([request1, request2])
            .then(function (result) {
                var response = JSON.parse(result.responseText);
                //Handle responses
            })
            .fail(function (error) {
                var message = error.message;
                //Add handling of error that occurred
            });
    }
};

