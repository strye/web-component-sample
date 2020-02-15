export default { 
    expanses: { 
        keyField: "_id",
        fields: [
            {name: "_id", type: "text", required: false,            code: "id", canEdit: false, class: "fld-id", grp: "key", label:"Id"},
            {name: "title", type: "text", required: true,           code: "ttl", canEdit: true, class: "fld-text", grp: "act", label:"Title"},
            {name: "purpose", type: "textarea", required: true,     code: "prp", canEdit: true, class: "fld-ta", grp: "act", label:"Purpose"},
            {name: "priority", type: "int",                         code: "pri", canEdit: true, class: "fld-num", grp: "trg", label:"Id"},
        ]
    },
    explorations: { 
        keyField: "_id",
        fields: [
            {name: "_id", type: "text", required: false,            code: "id", canEdit: false, class: "fld-id", grp: "key", label:"Id"},
            {name: "title", type: "text", required: true,           code: "ttl", canEdit: true, class: "fld-text", grp: "act", label:"Title"},
            {name: "expanseId", type: "text", required: true,       code: "act", canEdit: true, class: "fld-text-sm", grp: "act", label:"TI Activation"},
        ]
    },
    aspirations: { 
        //{ "_id" : "50d781a18c34e1bb49000001" , "met" : false , "target" : "test" , "title" : "Test Goal for Topic One" , "explorationId" : "50d8b2fb3076d1011df8c649"}
        keyField: "_id",
        fields: [
            {name: "_id", type: "text", required: false,                code: "id", canEdit: false, class: "fld-id", grp: "key",        label:"Id"},
            {name: "title", type: "text", required: true,               code: "ti", canEdit: true, class: "fld-text-sm", grp: "act",    label:"TI"},
            {name: "expanseId", type: "text", required: true,           code: "act", canEdit: true, class: "fld-text", grp: "act",      label:"TI Activation"},
            {name: "explorationId", type: "text", required: true,       code: "act", canEdit: true, class: "fld-text", grp: "act",      label:"TI Activation"},
            {name: "met", type: "text", required: true,                 code: "ti", canEdit: true, class: "fld-text-sm", grp: "act",    label:"TI"},
            {name: "target", type: "text", required: true,              code: "ti", canEdit: true, class: "fld-text-sm", grp: "act",    label:"TI"},
        ]
    },
    activities: { 
        //{ "_id" : "50d8a8a6c1f9f75655000003" , "createDate" : "2012-12-24T19:10:30.381Z" , "modifiedDate" : "2012-12-23T22:31:55.871Z" , "owner" : { "userId" : "" , "userName" : ""} , "expanseId" : "50db42348ee191efa1f6732f" , "status" : 2 , "targetDate" : "prolatariate" , "title" : "Take up arms and act! 1.2" , "explorationId" : "50d8b2fb3076d1011df8c649"}
        keyField: "_id",
        fields: [
            {name: "_id", type: "text", required: false,                code: "id", canEdit: false, class: "fld-id", grp: "key",        label:"Id"},
            {name: "title", type: "text", required: true,               code: "ti", canEdit: true, class: "fld-text-sm", grp: "act",    label:"TI"},
            {name: "explorationId", type: "text", required: true,       code: "act", canEdit: true, class: "fld-text", grp: "act",      label:"TI Activation"},
            {name: "expanseId", type: "text", required: true,           code: "act", canEdit: true, class: "fld-text", grp: "act",      label:"TI Activation"},
            {name: "targetDate", type: "text", required: true,          code: "act", canEdit: true, class: "fld-text", grp: "act",      label:"TI Activation"},
            {name: "status", type: "text", required: true,              code: "act", canEdit: true, class: "fld-text", grp: "act",      label:"TI Activation"},
            {name: "createDate", type: "text", required: true,          code: "act", canEdit: true, class: "fld-text", grp: "act",      label:"TI Activation"},
            {name: "modifiedDate", type: "text", required: true,        code: "act", canEdit: true, class: "fld-text", grp: "act",      label:"TI Activation"},
            {name: "owner", type: "text", required: true,               code: "act", canEdit: true, class: "fld-text", grp: "act",      label:"TI Activation"},
        ]
    },
    inquiries: { 
        //{ "_id" : "50bd95ac3f60a61804000011" , "answer" :  null  , "answeredOn" :  null  , "askedOn" : "2012-12-04T06:18:20.691Z" , "question" : "New question" , "expanseId" : "50db42348ee191efa1f6732f" , "explorationId" : "50d8b2fb3076d1011df8c649"}
        keyField: "_id",
        fields: [
            {name: "_id", type: "text", required: false,                       code: "id", canEdit: false, class: "fld-id", grp: "key",        label:"Id"},
            {name: "question", type: "text", required: true,                                  code: "ti", canEdit: true, class: "fld-text-sm", grp: "act",    label:"TI"},
            {name: "answer", type: "text", required: true,                          code: "act", canEdit: true, class: "fld-text", grp: "act",      label:"TI Activation"},
            {name: "answeredOn", type: "text", required: true,                          code: "act", canEdit: true, class: "fld-text", grp: "act",      label:"TI Activation"},
            {name: "askedOn", type: "text", required: true,                          code: "act", canEdit: true, class: "fld-text", grp: "act",      label:"TI Activation"},
            {name: "expanseId", type: "text", required: true,           code: "act", canEdit: true, class: "fld-text", grp: "act",      label:"TI Activation"},
            {name: "explorationId", type: "text", required: true,       code: "act", canEdit: true, class: "fld-text", grp: "act",      label:"TI Activation"},
        ]
    },
    momentos: { 
        //{ "_id" : "50b13d08ba90fc0e13000001" , "createDate" : "2012-11-24T21:32:56.504Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Note for second agenda" , "explorationId" : "50d8b3173076d1011df8c64a" , "writer" : { "userId" : 1 , "userName" : "will"}}
        keyField: "_id",
        fields: [
            {name: "_id", type: "text", required: false,                       code: "id", canEdit: false, class: "fld-id", grp: "key",        label:"Id"},
            {name: "note", type: "text", required: true,                                  code: "ti", canEdit: true, class: "fld-text-sm", grp: "act",    label:"TI"},
            {name: "createDate", type: "text", required: true,          code: "act", canEdit: true, class: "fld-text", grp: "act",      label:"TI Activation"},
            {name: "modifiedDate", type: "text", required: true,        code: "act", canEdit: true, class: "fld-text", grp: "act",      label:"TI Activation"},
            {name: "writer", type: "text", required: true,                          code: "act", canEdit: true, class: "fld-text", grp: "act",      label:"TI Activation"},
            {name: "expanseId", type: "text", required: true,           code: "act", canEdit: true, class: "fld-text", grp: "act",      label:"TI Activation"},
            {name: "explorationId", type: "text", required: true,       code: "act", canEdit: true, class: "fld-text", grp: "act",      label:"TI Activation"},
        ]
    },
    users: { 
        //{ "_id" : "gordon.solomon@bornmonday.com" , "fullName" : "Solomon Grundy" , "password" : "grundy" , "spaces" : [ "50db42348ee191efa1f6732f" , "50db42528ee191efa1f67331"] , "username" : "grundy"}
        keyField: "_id",
        fields: [
            {name: "_id", type: "text", required: false,                       code: "id", canEdit: false, class: "fld-id", grp: "key",        label:"Id"},
            {name: "fullName", type: "text", required: true,                                  code: "ti", canEdit: true, class: "fld-text-sm", grp: "act",    label:"TI"},
            {name: "password", type: "text", required: true,                          code: "act", canEdit: true, class: "fld-text", grp: "act",      label:"TI Activation"},
            {name: "spaces", type: "text", required: true,                          code: "act", canEdit: true, class: "fld-text", grp: "act",      label:"TI Activation"},
            {name: "username", type: "text", required: true,                          code: "act", canEdit: true, class: "fld-text", grp: "act",      label:"TI Activation"},
        ]
    },
    notz: { 
        //{ "_id" : "50b13d08ba90fc0e13000001" , "createDate" : "2012-11-24T21:32:56.504Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Note for second agenda" , "explorationId" : "50d8b3173076d1011df8c64a" , "writer" : { "userId" : 1 , "userName" : "will"}}
        keyField: "_id",
        fields: [
            {name: "_id", type: "text", required: false, display: {label:"Id", code: "id", canEdit: false, class: "fld-id"} },
            {name: "note", type: "textarea", required: true, display: {label:"Note", code: "nte", canEdit: true, class: "fld-ta"} },

            {name: "createDate", type: "datetime", required: false, display: {label:"Created On", code: "cdt", canEdit: false, class: "fld-text-sm"} },
            {name: "modifiedDate", type: "datetime", required: false, display: {label:"Modified On", code: "mdt", canEdit: false, class: "fld-text-sm"} },

            {name: "owner", type: "json", required: true, display: {label:"Owner", code: "own", canEdit: true, class: "fld-text-sm"} },

            {name: "expanseId", type: "text", required: true, display: false },
            {name: "explorationId", type: "text", required: true, display: false },
        ]
    },
    notzData: { 
        //{ "_id" : "50b13d08ba90fc0e13000001" , "createDate" : "2012-11-24T21:32:56.504Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Note for second agenda" , "explorationId" : "50d8b3173076d1011df8c64a" , "writer" : { "userId" : 1 , "userName" : "will"}}
        keyField: "_id",
        fields: [
            {name: "_id", type: "uuid", required: false, input: "auto" },
            {name: "note", type: "text", required: true, input: "user" },
            {name: "createDate", type: "datetime", required: false, input: "auto" },
            {name: "modifiedDate", type: "datetime", required: false, input: "auto" },
            {name: "owner", type: "json", required: true, input: "user" },
            {name: "expanseId", type: "uuid", required: true, input: "system" },
            {name: "explorationId", type: "uuid", required: true, input: "system" },
        ]
    },

}