"use strict";
///<reference path="animal.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Clases;
(function (Clases) {
    var Mascota = /** @class */ (function (_super) {
        __extends(Mascota, _super);
        function Mascota(id, nombre, edad, patas, tipo) {
            var _this = _super.call(this, nombre, edad, patas) || this;
            _this.id = id;
            _this.tipo = tipo;
            return _this;
        }
        return Mascota;
    }(Clases.Animal));
    Clases.Mascota = Mascota;
})(Clases || (Clases = {}));
//# sourceMappingURL=mascota.js.map