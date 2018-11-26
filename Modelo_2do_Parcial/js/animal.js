"use strict";
var Clases;
(function (Clases) {
    var Animal = /** @class */ (function () {
        function Animal(nom, edad, patas) {
            this.nombre = nom;
            this.edad = edad;
            this.patas = patas;
        }
        Animal.prototype.toJSON = function () {
            var json = "{\"nombre\":\"" + this.nombre + "\", \"edad\":" + this.edad + ",\"patas\":" + this.patas + "}";
            return json;
        };
        return Animal;
    }());
    Clases.Animal = Animal;
})(Clases || (Clases = {}));
//# sourceMappingURL=animal.js.map