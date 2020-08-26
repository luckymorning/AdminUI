var osData = [
    {name: 'Windows 2000', group: 'windows_server', identifier: 'Windows NT 5.0', version: '5.0'},
    {name: 'Windows XP', group: 'windows', identifier: 'Windows NT 5.1', version: '5.1'},
    {name: 'Windows 2003', group: 'windows_server', identifier: 'Windows NT 5.2', version: '5.2'},
    {name: 'Windows Vista', group: 'windows', identifier: 'Windows NT 6.0', version: '6.0'},
    {name: 'Windows 7', group: 'windows', identifier: 'Windows NT 6.1', version: '7.0'},
    {name: 'Windows 8', group: 'windows', identifier: 'Windows NT 6.2', version: '8.0'},
    {name: 'Windows 8.1', group: 'windows', identifier: 'Windows NT 6.3', version: '8.1'},
    {name: 'Windows 10', group: 'windows', identifier: 'Windows NT 10.0', version: '10.0'},
    {name: 'Windows 2008', group: 'windows_server', identifier: 'Windows NT 6.0; WOW64', version: '6.0'},
    {name: 'Windows 2008', group: 'windows_server', identifier: 'Windows NT 6.1; WOW64', version: '6.1'},
    {name: 'Windows 2012', group: 'windows_server', identifier: 'Windows NT 6.3; Win64', version: '6.3'},
    {name: 'Chrome OS', group: 'windows', identifier: 'CrOS'},
    {
        name: 'Mac OS X Capitan',
        group: 'mac',
        identifier: 'Mac OS X (10([_|\.])11([0-9_\.]*))',
        versionSeparator: '[_|\.]'
    },
    {
        name: 'Mac OS X Yosemite',
        group: 'mac',
        identifier: 'Mac OS X (10([_|\.])10([0-9_\.]*))',
        versionSeparator: '[_|\.]'
    },
    {
        name: 'Mac OS X Mavericks',
        group: 'mac',
        identifier: 'Mac OS X (10([_|\.])9([0-9_\.]*))',
        versionSeparator: '[_|\.]'
    },
    {
        name: 'Mac OS X Mountain Lion',
        group: 'mac',
        identifier: 'Mac OS X (10([_|\.])8([0-9_\.]*))',
        versionSeparator: '[_|\.]'
    },
    {name: 'Mac OS X Lion', group: 'mac', identifier: 'Mac OS X (10([_|\.])7([0-9_\.]*))', versionSeparator: '[_|\.]'},
    {
        name: 'Mac OS X Snow Leopard',
        group: 'mac',
        identifier: 'Mac OS X (10([_|\.])6([0-9_\.]*))',
        versionSeparator: '[_|\.]'
    },
    {
        name: 'Mac OS X Leopard',
        group: 'mac',
        identifier: 'Mac OS X (10([_|\.])5([0-9_\.]*))',
        versionSeparator: '[_|\.]'
    },
    {name: 'Mac OS X Tiger', group: 'mac', identifier: 'Mac OS X (10([_|\.])4([0-9_\.]*))', versionSeparator: '[_|\.]'},
    {
        name: 'Mac OS X Panther',
        group: 'mac',
        identifier: 'Mac OS X (10([_|\.])3([0-9_\.]*))',
        versionSeparator: '[_|\.]'
    },
    {
        name: 'Mac OS X Jaguar',
        group: 'mac',
        identifier: 'Mac OS X (10([_|\.])2([0-9_\.]*))',
        versionSeparator: '[_|\.]'
    },
    {name: 'Mac OS X Puma', group: 'mac', identifier: 'Mac OS X (10([_|\.])1([0-9_\.]*))', versionSeparator: '[_|\.]'},
    {
        name: 'Mac OS X Cheetah',
        group: 'mac',
        identifier: 'Mac OS X (10([_|\.])0([0-9_\.]*))',
        versionSeparator: '[_|\.]'
    },
    {name: 'Mac OS', group: 'mac', identifier: 'Mac OS'},
    {name: 'Ubuntu', group: 'linux_server', identifier: 'Ubuntu', versionIdentifier: 'Ubuntu/([0-9\.]*)'},
    {name: 'CentOs', group: 'linux_server', identifier: 'CentOs', versionIdentifier: 'CentOs/([0-9\.]*)'},
    {name: 'Debian', group: 'linux_server', identifier: 'Debian'},
    {name: 'Gentoo', group: 'linux_server', identifier: 'Gentoo'},
    {name: '国产系统', group: 'linux', identifier: 'Linux'}
];

var setOsData = function (os) {
    var userAgent = navigator.userAgent.toLowerCase();
    // Check browser type
    for (i in osData) {
        if (osData.hasOwnProperty(i)) {
            var osRegExp = new RegExp(osData[i].identifier.toLowerCase());
            var osRegExpResult = osRegExp.exec(userAgent);

            if (osRegExpResult != null) {
                os.name = osData[i].name;
                os.group = osData[i].group;
                break;
            }
        }
    }

    return true;
};


var setOsVersion = function (os, version, separator) {
    if (separator.substr(0, 1) == '[') {
        var splitVersion = version.split(new RegExp(separator, 'g'), 2);
    } else {
        var splitVersion = version.split(separator, 2);
    }

    if (separator != '.') {
        version = version.replace(new RegExp(separator, 'g'), '.');
    }

    os.fullVersion = version;

    // Major version
    if (splitVersion[0]) {
        os.majorVersion = parseInt(splitVersion[0]);
    }

    // Minor version
    if (splitVersion[1]) {
        os.minorVersion = parseInt(splitVersion[1]);
    }

    return true;
};