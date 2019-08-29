(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["NeoVis"] = factory();
	else
		root["NeoVis"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defaults; });
const defaults = {

  neo4j: {
    initialQuery: `MATCH (n) WHERE exists(n.pagerank)
                        WITH (n), RAND() AS random
                        ORDER BY random LIMIT 3000
                        OPTIONAL MATCH (n)-[r]-(m)
                        //WITH n,r,m WHERE exists(n.pagerank) AND exists(m.pagerank) AND exists(m.community)
                        RETURN n, r, m;`,
    neo4jUri: 'bolt://localhost:7687',
    neo4jUser: 'neo4j',
    neo4jPassword: 'neo4j',
    encrypted: 'ENCRYPTION_OFF',
    trust: 'TRUST_ALL_CERTIFICATES'
  },

  visjs: {
    groups: {
      useDefaultGroups: true,
      myGroupId: {
        /*node options*/
      }
    }
  }
}




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const CompletionEvent = 'completed';
/* harmony export (immutable) */ __webpack_exports__["b"] = CompletionEvent;


class EventController {

    constructor() {
        this._handlers = {
            [CompletionEvent]: [],
        };
    }

    /**
     * 
     * @param {string} eventType Type of the event to be handled
     * @param {callback} handler Handler to manage the event
     */
    register(eventType, handler) {
        if (this._handlers[eventType] === undefined) {
            throw new Error('Unknown event: ' + eventType);
        }

        this._handlers[eventType].push(handler);
    }

    /**
     * 
     * @param {string} eventType Type of the event generated
     * @param {dictionary} value Values associated to the event
     */
    generateEvent(eventType, values) {
        if (this._handlers[eventType] === undefined) {
            throw new Error('Unknown event: ' + eventType);
        }

        for (const handler of this._handlers[eventType]) {
            handler(values);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EventController;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
throw new Error("Cannot find module \"../vendor/neo4j-javascript-driver/lib/browser/neo4j-web.js\"");
throw new Error("Cannot find module \"../vendor/vis/dist/vis-network.min.js\"");
throw new Error("Cannot find module \"../vendor/vis/dist/vis-network.min.css\"");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__defaults__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__events__ = __webpack_require__(1);








class NeoVis {

  /**
   *
   * @constructor
   * @param {object} config - configures the visualization and Neo4j server connection
   *  {
   *    container:
   *    server_url:
   *    server_password?:
   *    server_username?:
   *    initial_cypher?:
   *    labels:
   *    relationships:
   *    driver?:
   *    data?:{ nodes: {42:{id:42,label:"A Name", value?:0.5, group?:13, title?:"detailed information"}},
                  relationships: {11:{id:11, from:42, to: 43, label?:"KNOWS", value?:0.3, title?:"detailed information"}}}
   *
   *  }
   *
   */

  constructor (config) {
    console.log(config)
    console.log(__WEBPACK_IMPORTED_MODULE_3__defaults__["a" /* defaults */])

    this._config = config
    this._nodes = {}
    this._edges = {}

    if (typeof config['data'] === 'object') {
      let data = config['data']
      this._nodes = typeof data['nodes'] === 'object' ? data['nodes'] : {}
      this._edges = typeof data['relationships'] === 'object' ? data['relationships'] : {}
    }
    if (typeof config['driver'] === 'object') {
      this._driver = config['driver']
    } else {
      this._encrypted = config.encrypted || __WEBPACK_IMPORTED_MODULE_3__defaults__["a" /* defaults */]['neo4j']['encrypted']
      this._trust = config.trust || __WEBPACK_IMPORTED_MODULE_3__defaults__["a" /* defaults */].neo4j.trust
      this._driver = __WEBPACK_IMPORTED_MODULE_0__vendor_neo4j_javascript_driver_lib_browser_neo4j_web_js__["v1"].driver(config.server_url || __WEBPACK_IMPORTED_MODULE_3__defaults__["a" /* defaults */].neo4j.neo4jUri, __WEBPACK_IMPORTED_MODULE_0__vendor_neo4j_javascript_driver_lib_browser_neo4j_web_js__["v1"].auth.basic(config.server_user || __WEBPACK_IMPORTED_MODULE_3__defaults__["a" /* defaults */].neo4j.neo4jUser, config.server_password || __WEBPACK_IMPORTED_MODULE_3__defaults__["a" /* defaults */].neo4j.neo4jPassword), {
        encrypted: this._encrypted,
        trust: this._trust
      })
    }
    this._query = config.initial_cypher || __WEBPACK_IMPORTED_MODULE_3__defaults__["a" /* defaults */].neo4j.initialQuery

    this._data = {}
    this._network = null
    this._container = document.getElementById(config.container_id)
    this._events = new __WEBPACK_IMPORTED_MODULE_4__events__["a" /* EventController */]()
  }

  _addNode (node) {
    this._nodes[node.id] = node
  }

  _addEdge (edge) {
    this._edges[edge.id] = edge
  }

  /**
   * Build node object for vis from a neo4j Node
   * FIXME: use config
   * FIXME: move to private api
   * @param n
   * @returns {{}}
   */
  buildNodeVisObject (n) {

    var self = this
    let node = {}
    let label = n.labels[0]

    let captionKey = this._config && this._config.labels && this._config.labels[label] && this._config.labels[label]['caption'],
      sizeKey = this._config && this._config.labels && this._config.labels[label] && this._config.labels[label]['size'],
      sizeCypher = this._config && this._config.labels && this._config.labels[label] && this._config.labels[label]['sizeCypher'],
      communityKey = this._config && this._config.labels && this._config.labels[label] && this._config.labels[label]['community']

    node['id'] = n.identity.toInt()

    // node size

    if (sizeCypher) {
      // use a cypher statement to determine the size of the node
      // the cypher statement will be passed a parameter {id} with the value
      // of the internal node id

      let session = this._driver.session()
      session.run(sizeCypher, {id: __WEBPACK_IMPORTED_MODULE_0__vendor_neo4j_javascript_driver_lib_browser_neo4j_web_js__["v1"].int(node['id'])})
        .then(function (result) {
          result.records.forEach(function (record) {
            record.forEach(function (v, k, r) {
              if (typeof v === 'number') {
                self._addNode({id: node['id'], value: v})
              } else if (v.constructor.name === 'Integer') {
                self._addNode({id: node['id'], value: v.toNumber()})
              }
            })
          })
        })

    } else if (typeof sizeKey === 'number') {
      node['value'] = sizeKey
    } else {

      let sizeProp = n.properties[sizeKey]

      if (sizeProp && typeof sizeProp === 'number') {
        // propety value is a number, OK to use
        node['value'] = sizeProp
      } else if (sizeProp && typeof sizeProp === 'object' && sizeProp.constructor.name === 'Integer') {
        // property value might be a Neo4j Integer, check if we can call toNumber on it:
        if (sizeProp.inSafeRange()) {
          node['value'] = sizeProp.toNumber()
        } else {
          // couldn't convert to Number, use default
          node['value'] = 1.0
        }
      } else {
        node['value'] = 1.0
      }
    }

    // node caption
    if (typeof captionKey === 'function') {
      node['label'] = captionKey(n)
    } else {
      node['label'] = n.properties[captionKey] || label || ''
    }

    // community
    // behavior: color by value of community property (if set in config), then color by label
    if (!communityKey) {
      node['group'] = label
    } else {
      try {
        if (n.properties[communityKey]) {
          node['group'] = n.properties[communityKey].toNumber() || label || 0  // FIXME: cast to Integer

        } else {
          node['group'] = 0
        }

      } catch (e) {
        node['group'] = 0
      }

    }

    // set all properties as tooltip
    node['title'] = ''
    for (let key in n.properties) {
      node['title'] += '<strong>' + key + ':</strong>' + ' ' + n.properties[key] + '<br>'
    }
    return node
  }

  /**
   * Build edge object for vis from a neo4j Relationship
   * @param r
   * @returns {{}}
   */
  buildEdgeVisObject (r) {

    let weightKey = this._config && this._config.relationships && this._config.relationships[r.type] && this._config.relationships[r.type]['thickness'],
      captionKey = this._config && this._config.relationships && this._config.relationships[r.type] && this._config.relationships[r.type]['caption']

    let edge = {}
    edge['id'] = r.identity.toInt()
    edge['from'] = r.start.toInt()
    edge['to'] = r.end.toInt()

    // hover tooltip. show all properties in the format <strong>key:</strong> value
    edge['title'] = ''
    for (let key in r.properties) {
      edge['title'] += '<strong>' + key + ':</strong>' + ' ' + r.properties[key] + '<br>'
    }

    // set relationship thickness
    if (weightKey && typeof weightKey === 'string') {
      edge['value'] = r.properties[weightKey]
    } else if (weightKey && typeof weightKey === 'number') {
      edge['value'] = weightKey
    } else {
      edge['value'] = 1.0
    }

    // set caption

    if (typeof captionKey === 'boolean') {
      if (!captionKey) {
        edge['label'] = ''
      } else {
        edge['label'] = r.type
      }
    } else if (captionKey && typeof captionKey === 'string') {
      edge['label'] = r.properties[captionKey] || ''
    } else {
      edge['label'] = r.type
    }

    return edge
  }

  // public API

  render () {
    if (this._query && this._query.length > 5) {
      this.loadData(this.renderData)
    } else {
      this.renderData()
    }
  }

  consumeRecord (record) {
    let self = this
    console.log('CLASS NAME')
    console.log(record.constructor.name)
    console.log(record)

    record.forEach(function (v, k, r) {
      console.log('Constructor:')
      console.log(v.constructor.name)
      if (v.constructor.name === 'Node') {
        let node = self.buildNodeVisObject(v)

        try {
          self._addNode(node)
        } catch (e) {
          console.log(e)
        }

      } else if (v.constructor.name === 'Relationship') {

        let edge = self.buildEdgeVisObject(v)

        try {
          self._addEdge(edge)
        } catch (e) {
          console.log(e)
        }

      } else if (v.constructor.name === 'Path') {
        console.log('PATH')
        console.log(v)
        let n1 = self.buildNodeVisObject(v.start)
        let n2 = self.buildNodeVisObject(v.end)

        self._addNode(n1)
        self._addNode(n2)

        v.segments.forEach((obj) => {

          self._addNode(self.buildNodeVisObject(obj.start))
          self._addNode(self.buildNodeVisObject(obj.end))
          self._addEdge(self.buildEdgeVisObject(obj.relationship))
        })

      } else if (v.constructor.name === 'Array') {
        v.forEach(function (obj) {
          console.log('Array element constructor:')
          console.log(obj.constructor.name)
          if (obj.constructor.name === 'Node') {
            let node = self.buildNodeVisObject(obj)

            try {
              self._addNode(node)
            } catch (e) {
              console.log(e)
            }
          } else if (obj.constructor.name === 'Relationship') {
            let edge = self.buildEdgeVisObject(obj)

            try {
              self._addEdge(edge)
            } catch (e) {
              console.log(e)
            }
          }
        })
      }
    })
  }

  loadData (completionCallback) {
    let self = this
    let recordCount = 0
    // connect to Neo4j instance
    // run query
    let session = this._driver.session()
    session
      .run(this._query, {limit: 30})
      .subscribe({
        onNext: function (record) {
          recordCount++
          self.consumeRecord(record)
        },
        onCompleted: function () {
          session.close()
          completionCallback.apply(self)
          self._events.generateEvent(__WEBPACK_IMPORTED_MODULE_4__events__["b" /* CompletionEvent */], {record_count: recordCount})
          console.log('completed')

        },
        onError: function (error) {
          console.log(error)
        }
      })
  }

  renderOptions () {
    return {
      nodes: {
        shape: 'dot',
        font: {
          size: 26,
          strokeWidth: 4
        },
        scaling: {
          label: {
            enabled: true
          }
        }
      },
      edges: {
        arrows: {
          to: {enabled: this._config.arrows || false} // FIXME: handle default value
        },
        length: 1000
      },
      layout: {
        improvedLayout: true,
        hierarchical: {
          enabled: true,
          levelSeparation: 150,
          nodeSpacing: 200,
          treeSpacing: 400,
          blockShifting: true,
          edgeMinimization: true,
          parentCentralization: true,
          direction: 'UD',        // UD, DU, LR, RL
          sortMethod: 'hubsize'   // hubsize, directed
        }
      },
      physics: { // TODO: adaptive physics settings based on size of graph rendered
        // enabled: true,
        // timestep: 0.5,
        // stabilization: {
        //     iterations: 10
        // }
        solver: 'repulsion',
        adaptiveTimestep: true,
        repulsion: {
          centralGravity: 0.2,
          springLength: 200,
          springConstant: 0.05,
          nodeDistance: 100,
          damping: 0.09
        },
        stabilization: {
          iterations: 200,
          fit: true
        }

      },
      groups: this._config.visjs.groups
    }
  }

  renderData () {
    let options = this.renderOptions()
    console.log("aaaa")
    console.log(options)
    var container = this._container
    this._data = {
      'nodes': new __WEBPACK_IMPORTED_MODULE_1__vendor_vis_dist_vis_network_min_js__["DataSet"](Object.values(this._nodes)),
      'edges': new __WEBPACK_IMPORTED_MODULE_1__vendor_vis_dist_vis_network_min_js__["DataSet"](Object.values(this._edges))
    }

    console.log(this._data.nodes)
    console.log(this._data.edges)

    // Create duplicate node for any self reference relationships
    // NOTE: Is this only useful for data model type data
    // self._data.edges = self._data.edges.map(
    //     function (item) {
    //          if (item.from == item.to) {
    //             var newNode = self._data.nodes.get(item.from)
    //             delete newNode.id;
    //             var newNodeIds = self._data.nodes.add(newNode);
    //             console.log("Adding new node and changing self-ref to node: " + item.to);
    //             item.to = newNodeIds[0];
    //          }
    //          return item;
    //     }
    // );

    this._network = new __WEBPACK_IMPORTED_MODULE_1__vendor_vis_dist_vis_network_min_js__["Network"](container, this._data, options)
    // note :: THIS IS AN HACK for simple positioning of the canvas
    this._network.moveTo({
    })
    setTimeout(() => {
      this._network.stopSimulation()
    }, 10000)
    return this._network
  }

  /**
   * Clear the data for the visualization
   */
  clearNetwork () {
    this._nodes = {}
    this._edges = {}
    this._network.setData([])
  }

  /**
   *
   * @param {string} eventType Event type to be handled
   * @param {callback} handler Handler to manage the event
   */
  registerOnEvent (eventType, handler) {
    this._events.register(eventType, handler)
  }

  /**
   * Reset the config object and reload data
   * @param config
   */
  reinit (config) {

  };

  /**
   * Fetch live data form the server and reload the visualization
   */
  reload () {

    this.clearNetwork()
    this.render()

  };

  /**
   * Stabilize the visuzliation
   */
  stabilize () {
    this._network.stopSimulation()
    console.log('Calling stopSimulation')
  }

  /**
   * Execute an arbitrary Cypher query and re-render the visualization
   * @param query
   */
  renderWithCypher (query) {

    //self._config.initial_cypher = query;

    this.clearNetwork()
    this._query = query
    this.render()
  };

  /**
   * render with given data
   * @param data - an object of {nodes: {id1:node1}, relationships: {id1:rel1}}
   */
  renderWithData (data) {
    this.clearNetwork()
    if (typeof data === 'object') {
      this._nodes = typeof data['nodes'] === 'object' ? data['nodes'] : {}
      this._edges = typeof data['relationships'] === 'object' ? data['relationships'] : {}
    }
    this.render()
  }

  renderWithResults (results) {
    let self = this
    self.clearNetwork()
    let recordCount = 0
    results.forEach(function (record) {
      recordCount++
      self.consumeRecord(record)
    })
    self.renderData()
    self._events.generateEvent(__WEBPACK_IMPORTED_MODULE_4__events__["b" /* CompletionEvent */], {record_count: recordCount})
  }

  // configure exports based on environment (ie Node.js or browser)
  //if (typeof exports === 'object') {
  //    module.exports = NeoVis;
  //} else {
  //    define (function () {return NeoVis;})
  //}

}
/* harmony export (immutable) */ __webpack_exports__["default"] = NeoVis;




/***/ })
/******/ ]);
});