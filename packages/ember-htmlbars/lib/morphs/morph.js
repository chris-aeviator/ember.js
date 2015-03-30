import DOMHelper from "dom-helper";
import o_create from 'ember-metal/platform/create';

var HTMLBarsMorph = DOMHelper.prototype.MorphClass;

function EmberMorph(DOMHelper, contextualElement) {
  this.HTMLBarsMorph$constructor(DOMHelper, contextualElement);

  this.emberView = null;
  this.emberComponent = null;
  this.emberToDestroy = null;
  this.streamUnsubscribers = null;
  this.shouldReceiveAttrs = false;
}

var proto = EmberMorph.prototype = o_create(HTMLBarsMorph.prototype);
proto.HTMLBarsMorph$constructor = HTMLBarsMorph;

proto.addDestruction = function(toDestroy) {
  this.emberToDestroy = this.emberToDestroy || [];
  this.emberToDestroy.push(toDestroy);
};

proto.cleanup = function() {
  if (this.emberView) {
    this.emberView.destroy();
  }

  var toDestroy = this.emberToDestroy;
  if (toDestroy) {
    for (var i=0, l=toDestroy.length; i<l; i++) {
      toDestroy[i].destroy();
    }

    this.emberToDestroy = null;
  }
};

export default EmberMorph;
