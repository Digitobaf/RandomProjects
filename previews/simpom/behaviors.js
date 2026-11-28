/* Editable prototype step lists. All timings and layer choices are authored previews, not recovered BHAV scripts.
Sound loop overrides, when present, are explicit. See OBJECT-NOTES.md. */
window.SIMS_BEHAVIORS = {
  "34fe4e17": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "sink_washhands"
      }
    },
    "note": "Faucet squeak precedes running wash water; two sink states are not treated as a looping animation.",
    "hint": "Click to wash dishes.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 180,
          "layers": []
        }
      ],
      "sound": {
        "event": "tub1_sfaucetsqueak",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 1,
          "durationMs": 4000,
          "layers": []
        }
      ],
      "sound": {
        "event": "sink_washdishes",
        "loop": false
      }
    }
  },
  "c2a91fd0": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Open, pour, glass clink, then close; no unrelated drinking voices.",
    "hint": "Click to pour a drink.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 80,
          "sound": {
            "event": "bar_open",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 250,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 550,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 950,
          "sound": {
            "event": "bar_pourdrink",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 260,
          "sound": {
            "event": "bar_glassclink",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 320,
          "sound": {
            "event": "bar_close",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 320,
          "layers": []
        }
      ]
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 80,
          "sound": {
            "event": "bar_open",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 250,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 550,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 950,
          "sound": {
            "event": "bar_pourdrink",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 260,
          "sound": {
            "event": "bar_glassclink",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 320,
          "sound": {
            "event": "bar_close",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 320,
          "layers": []
        }
      ]
    }
  },
  "a82ca08e": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 190,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 190,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 190,
          "layers": []
        },
        {
          "state": 4,
          "durationMs": 190,
          "layers": []
        }
      ],
      "loop": true,
      "sound": {
        "event": "fountain_tinkle"
      }
    },
    "note": "Four named fountain animation frames with running water.",
    "hint": "Click for a splash.",
    "click": {
      "steps": [
        {
          "state": 1,
          "durationMs": 650,
          "layers": []
        }
      ],
      "sound": {
        "event": "fountain_splash",
        "loop": false
      }
    }
  },
  "bf137195": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Lever lifts, grinder runs, steam follows, lever returns. Broken state excluded.",
    "hint": "Click to brew an espresso.",
    "start": {
      "steps": [
        {
          "state": 1,
          "durationMs": 250,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 650,
          "sound": {
            "event": "coffee_grind_loop",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 1800,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 2450,
          "sound": {
            "event": "coffee_expresso_steam",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 250,
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 250,
          "layers": []
        }
      ]
    },
    "click": {
      "steps": [
        {
          "state": 1,
          "durationMs": 250,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 650,
          "sound": {
            "event": "coffee_grind_loop",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 1800,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 2450,
          "sound": {
            "event": "coffee_expresso_steam",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 250,
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 250,
          "layers": []
        }
      ]
    }
  },
  "d191aff7": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 2,
          "durationMs": 500,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 500,
          "layers": []
        },
        {
          "state": 4,
          "durationMs": 500,
          "layers": []
        },
        {
          "state": 5,
          "durationMs": 500,
          "layers": []
        }
      ],
      "loop": true,
      "sound": {
        "event": "computer_type"
      }
    },
    "note": "Model-appropriate boot sound, then lit game screen frames and keyboard typing.",
    "hint": "Click for game audio.",
    "start": {
      "steps": [
        {
          "state": 1,
          "durationMs": 250,
          "layers": []
        }
      ],
      "sound": {
        "event": "computer_boot_cheap",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 4,
          "durationMs": 4500,
          "layers": []
        }
      ],
      "sound": {
        "event": "computer_game",
        "loop": false
      }
    },
    "stop": {
      "steps": [
        {
          "state": 0,
          "durationMs": 3450,
          "layers": []
        }
      ],
      "sound": {
        "event": "computer_turn_off",
        "loop": false
      }
    }
  },
  "98e0f8bd": {
    "idle": {
      "state": 1,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 230,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 230,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 230,
          "layers": []
        },
        {
          "state": 4,
          "durationMs": 230,
          "layers": []
        },
        {
          "state": 5,
          "durationMs": 230,
          "layers": []
        }
      ],
      "loop": true,
      "sound": {
        "event": "aquarium_running"
      }
    },
    "note": "Live fish frames; feed frames on click. Dead/dirty stages are not autoplayed.",
    "hint": "Click to feed the fish.",
    "click": {
      "steps": [
        {
          "state": 6,
          "durationMs": 260,
          "layers": []
        },
        {
          "state": 7,
          "durationMs": 260,
          "layers": []
        },
        {
          "state": 8,
          "durationMs": 260,
          "layers": []
        },
        {
          "state": 9,
          "durationMs": 260,
          "layers": []
        }
      ],
      "sound": {
        "event": "aquarium_feed",
        "loop": false
      }
    }
  },
  "bb626ef3": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 5,
          "durationMs": 1000,
          "light": true,
          "layers": []
        }
      ],
      "loop": true,
      "sound": {
        "event": "microwave_scook"
      }
    },
    "note": "Beep precedes cooking loop. Door opening and closing are ordered. On aliases Closed, so front window uses a provisional light.",
    "hint": "Click to open and close the door.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 200,
          "layers": []
        }
      ],
      "sound": {
        "event": "microwave_sbeep",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 1,
          "durationMs": 90,
          "sound": {
            "event": "microwave_sopen",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 90,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 90,
          "layers": []
        },
        {
          "state": 4,
          "durationMs": 650,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 100,
          "sound": {
            "event": "microwave_sclose",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 100,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 100,
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 350,
          "layers": []
        }
      ]
    },
    "stop": {
      "steps": [
        {
          "state": 0,
          "durationMs": 600,
          "layers": []
        }
      ],
      "sound": {
        "event": "microwave_sdone",
        "loop": false
      }
    },
    "light": {
      "color": "#ffcb6b",
      "polygons": {
        "SE": [
          [
            33,
            39
          ],
          [
            50,
            30
          ],
          [
            50,
            43
          ],
          [
            33,
            53
          ]
        ],
        "SW": [
          [
            17,
            29
          ],
          [
            33,
            38
          ],
          [
            33,
            51
          ],
          [
            17,
            43
          ]
        ]
      }
    }
  },
  "dbeb6614": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 3,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Squeak, filling stream frames at rising water levels, then full bath. Drain descends on timer completion.",
    "hint": "Click to refill the bath.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 180,
          "sound": {
            "event": "tub1_sfaucetsqueak",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 5,
          "durationMs": 700,
          "sound": {
            "event": "tub1_stubfill",
            "loop": true,
            "channel": "water"
          },
          "layers": []
        },
        {
          "state": 9,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 13,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 6,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 10,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 14,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 7,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 11,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 15,
          "durationMs": 700,
          "layers": []
        }
      ]
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 180,
          "sound": {
            "event": "tub1_sfaucetsqueak",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 5,
          "durationMs": 700,
          "sound": {
            "event": "tub1_stubfill",
            "loop": true,
            "channel": "water"
          },
          "layers": []
        },
        {
          "state": 9,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 13,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 6,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 10,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 14,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 7,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 11,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 15,
          "durationMs": 700,
          "layers": []
        }
      ]
    },
    "stop": {
      "steps": [
        {
          "state": 3,
          "durationMs": 700,
          "sound": {
            "event": "tub1_sdrain",
            "loop": true,
            "channel": "water"
          },
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 700,
          "layers": []
        }
      ]
    }
  },
  "85e02a40": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "shower1_swateron"
      }
    },
    "note": "Door slides before faucet and running shower. Clothing stages are not invented as water animation.",
    "hint": "Click to slide the shower door.",
    "start": {
      "steps": [
        {
          "state": 1,
          "durationMs": 450,
          "sound": {
            "event": "shower1_sdoorslide",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 500,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 450,
          "sound": {
            "event": "shower1_sdoorslide",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 300,
          "sound": {
            "event": "shower1_sfaucetsqueak",
            "loop": false
          },
          "layers": []
        }
      ]
    },
    "click": {
      "steps": [
        {
          "state": 1,
          "durationMs": 450,
          "sound": {
            "event": "shower1_sdoorslide",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 500,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 450,
          "sound": {
            "event": "shower1_sdoorslide",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 300,
          "sound": {
            "event": "shower1_sfaucetsqueak",
            "loop": false
          },
          "layers": []
        }
      ]
    }
  },
  "d191ff6a": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 2,
          "durationMs": 500,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 500,
          "layers": []
        },
        {
          "state": 4,
          "durationMs": 500,
          "layers": []
        },
        {
          "state": 5,
          "durationMs": 500,
          "layers": []
        }
      ],
      "loop": true,
      "sound": {
        "event": "computer_type"
      }
    },
    "note": "Model-appropriate boot sound, then lit game screen frames and keyboard typing.",
    "hint": "Click for game audio.",
    "start": {
      "steps": [
        {
          "state": 1,
          "durationMs": 2200,
          "layers": []
        }
      ],
      "sound": {
        "event": "computer_boot_mod",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 4,
          "durationMs": 4500,
          "layers": []
        }
      ],
      "sound": {
        "event": "computer_game",
        "loop": false
      }
    },
    "stop": {
      "steps": [
        {
          "state": 0,
          "durationMs": 3450,
          "layers": []
        }
      ],
      "sound": {
        "event": "computer_turn_off",
        "loop": false
      }
    }
  },
  "8eaa68ad": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 180,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 180,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 180,
          "layers": []
        }
      ],
      "loop": true,
      "sound": {
        "event": "fireplace_on",
        "loop": true
      }
    },
    "note": "Match strikes once, then fire frames and fireplace sound. Export loop flags overridden for the one-shot match.",
    "hint": "Rotate to see the other sides.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1050,
          "layers": []
        }
      ],
      "sound": {
        "event": "match_strike",
        "loop": false
      }
    },
    "stop": {
      "steps": [
        {
          "state": 0,
          "durationMs": 550,
          "layers": []
        }
      ],
      "sound": {
        "event": "fireplace_off",
        "loop": false
      }
    }
  },
  "8fed54c2": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 180,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 180,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 180,
          "layers": []
        }
      ],
      "loop": true,
      "sound": {
        "event": "hottub_running",
        "loop": false
      }
    },
    "note": "Named bubbling frames. Exported running clip plays once on activation, not silently forced into a loop.",
    "hint": "Click the object to interact.",
    "click": {
      "steps": [
        {
          "state": 1,
          "durationMs": 260,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 260,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 260,
          "layers": []
        }
      ],
      "sound": {
        "event": "hottub_running",
        "loop": false
      }
    }
  },
  "253c1a5e": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 4,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "barbecue_sizzleloop"
      }
    },
    "note": "Open lid, ignition, then hot grill and looping sizzle.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 1,
          "durationMs": 110,
          "sound": {
            "event": "barbecue_open",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 110,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 150,
          "layers": []
        },
        {
          "state": 4,
          "durationMs": 1600,
          "sound": {
            "event": "barbecue_beinglit",
            "loop": false
          },
          "layers": []
        }
      ]
    },
    "click": {
      "steps": [
        {
          "state": 4,
          "durationMs": 4100,
          "layers": []
        }
      ],
      "sound": {
        "event": "barbecue_sizzlehot",
        "loop": false
      }
    },
    "stop": {
      "steps": [
        {
          "state": 2,
          "durationMs": 110,
          "sound": {
            "event": "barbecue_close",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 110,
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 160,
          "layers": []
        }
      ]
    }
  },
  "4ef4ea16": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static sofa; a single appropriate upholstery creak only.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "sofa1_ssqueak",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "sofa1_ssqueak",
        "loop": false
      }
    }
  },
  "85e00942": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 3,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Squeak, filling stream frames at rising water levels, then full bath. Drain descends on timer completion.",
    "hint": "Click to refill the bath.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 180,
          "sound": {
            "event": "tub1_sfaucetsqueak",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 5,
          "durationMs": 700,
          "sound": {
            "event": "tub1_stubfill",
            "loop": true,
            "channel": "water"
          },
          "layers": []
        },
        {
          "state": 9,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 13,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 6,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 10,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 14,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 7,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 11,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 15,
          "durationMs": 700,
          "layers": []
        }
      ]
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 180,
          "sound": {
            "event": "tub1_sfaucetsqueak",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 5,
          "durationMs": 700,
          "sound": {
            "event": "tub1_stubfill",
            "loop": true,
            "channel": "water"
          },
          "layers": []
        },
        {
          "state": 9,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 13,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 6,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 10,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 14,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 7,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 11,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 15,
          "durationMs": 700,
          "layers": []
        }
      ]
    },
    "stop": {
      "steps": [
        {
          "state": 3,
          "durationMs": 700,
          "sound": {
            "event": "tub1_sdrain",
            "loop": true,
            "channel": "water"
          },
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 700,
          "layers": []
        }
      ]
    }
  },
  "5a5cda09": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static table/display; place/get counter sounds only.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "counter_put_all",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "counter_get_all",
        "loop": false
      }
    }
  },
  "42c078b3": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "fridge_c_running",
        "loop": false
      }
    },
    "note": "Porcina cheap-fridge sounds only. Opening precedes closing; compressor clip is one-shot as exported.",
    "hint": "Click to open the fridge.",
    "click": {
      "steps": [
        {
          "state": 1,
          "durationMs": 160,
          "sound": {
            "event": "fridge_c_open",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 160,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 160,
          "layers": []
        },
        {
          "state": 4,
          "durationMs": 160,
          "layers": []
        },
        {
          "state": 5,
          "durationMs": 1000,
          "layers": []
        },
        {
          "state": 4,
          "durationMs": 100,
          "sound": {
            "event": "fridge_c_close",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 100,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 100,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 100,
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 160,
          "layers": []
        }
      ]
    }
  },
  "82e0f146": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static chair, single sit sound, no fabricated rocking.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "chair_sit_unmovable",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "chair_sit_unmovable",
        "loop": false
      }
    }
  },
  "996de865": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static chair, single sit sound, no fabricated rocking.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "chair_sit_unmovable",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "chair_sit_unmovable",
        "loop": false
      }
    }
  },
  "663eaffc": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": [
        0
      ]
    },
    "active": {
      "steps": [
        {
          "state": 5,
          "durationMs": 150,
          "layers": [
            0
          ]
        },
        {
          "state": 6,
          "durationMs": 150,
          "layers": [
            0
          ]
        },
        {
          "state": 7,
          "durationMs": 150,
          "layers": [
            0
          ]
        },
        {
          "state": 8,
          "durationMs": 150,
          "layers": [
            0
          ]
        },
        {
          "state": 9,
          "durationMs": 150,
          "layers": [
            0
          ]
        }
      ],
      "loop": true,
      "sound": {
        "event": "bed_vibrate",
        "loop": false
      }
    },
    "note": "Coin drops, bed vibration frames and motor. No unrelated social voices.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 3,
          "durationMs": 650,
          "layers": [
            0
          ]
        }
      ],
      "sound": {
        "event": "bed_coindrop",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1450,
          "layers": [
            0
          ]
        }
      ],
      "sound": {
        "event": "bed_make",
        "loop": false
      }
    }
  },
  "0924bc1f": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static chair, single sit sound, no fabricated rocking.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "chair_sit_unmovable",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "chair_sit_unmovable",
        "loop": false
      }
    }
  },
  "24dad5c4": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static chair, single sit sound, no fabricated rocking.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "chair_sit_unmovable",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "chair_sit_unmovable",
        "loop": false
      }
    }
  },
  "0f8beda7": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static chair, single sit sound, no fabricated rocking.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "chair_sit_unmovable",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "chair_sit_unmovable",
        "loop": false
      }
    }
  },
  "f718d902": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": [
        0,
        1,
        2,
        3
      ]
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 250,
          "layers": [
            0,
            1,
            2,
            3,
            4
          ]
        },
        {
          "state": 1,
          "durationMs": 250,
          "layers": [
            0,
            1,
            2,
            3,
            5
          ]
        },
        {
          "state": 2,
          "durationMs": 250,
          "layers": [
            0,
            1,
            2,
            3,
            6
          ]
        },
        {
          "state": 3,
          "durationMs": 250,
          "layers": [
            0,
            1,
            2,
            3,
            7
          ]
        },
        {
          "state": 4,
          "durationMs": 250,
          "layers": [
            0,
            1,
            2,
            3,
            8
          ]
        },
        {
          "state": 5,
          "durationMs": 250,
          "layers": [
            0,
            1,
            2,
            3,
            9
          ]
        },
        {
          "state": 6,
          "durationMs": 250,
          "layers": [
            0,
            1,
            2,
            3,
            4
          ]
        }
      ],
      "loop": true,
      "sound": {
        "event": "bubblemaker_bubble",
        "loop": false
      }
    },
    "note": "Bubble-machine states and bubble overlay frames with bubble sound.",
    "hint": "Click the object to interact.",
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": [
            0,
            1,
            2,
            3
          ]
        }
      ],
      "sound": {
        "event": "bubblemaker_bubble",
        "loop": false
      }
    }
  },
  "8e3520bd": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Stocking then full buffet. Food portions are stages, never an endlessly looping animation.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 1,
          "durationMs": 2150,
          "layers": []
        }
      ],
      "sound": {
        "event": "caterer_restock_pro",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 2,
          "durationMs": 500,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 500,
          "layers": []
        },
        {
          "state": 4,
          "durationMs": 1000,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 2150,
          "sound": {
            "event": "caterer_restock_pro",
            "loop": false
          },
          "layers": []
        }
      ]
    }
  },
  "5e8b157a": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 200,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 200,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 200,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 200,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 200,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 200,
          "layers": []
        }
      ],
      "loop": true,
      "sound": {
        "event": "bull_loop",
        "loop": false
      }
    },
    "note": "Bull angle frames and motor; no rider/fall voices.",
    "hint": "Click the object to interact.",
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "bull_loop",
        "loop": false
      }
    }
  },
  "da2b8f79": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Open, pour, glass clink, then close; no unrelated drinking voices.",
    "hint": "Click to pour a drink.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 80,
          "sound": {
            "event": "bar_open",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 250,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 550,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 950,
          "sound": {
            "event": "bar_pourdrink",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 260,
          "sound": {
            "event": "bar_glassclink",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 320,
          "sound": {
            "event": "bar_close",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 320,
          "layers": []
        }
      ]
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 80,
          "sound": {
            "event": "bar_open",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 250,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 550,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 950,
          "sound": {
            "event": "bar_pourdrink",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 260,
          "sound": {
            "event": "bar_glassclink",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 320,
          "sound": {
            "event": "bar_close",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 320,
          "layers": []
        }
      ]
    }
  },
  "4126d70f": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 170,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 170,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 170,
          "layers": []
        },
        {
          "state": 4,
          "durationMs": 170,
          "layers": []
        },
        {
          "state": 5,
          "durationMs": 170,
          "layers": []
        }
      ],
      "loop": true
    },
    "note": "Light switch then dancing lamp frames; switch-off on completion.",
    "hint": "Rotate to see the other sides.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 100,
          "layers": []
        }
      ],
      "sound": {
        "event": "lamp_turnon_click",
        "loop": false
      }
    },
    "stop": {
      "steps": [
        {
          "state": 0,
          "durationMs": 100,
          "layers": []
        }
      ],
      "sound": {
        "event": "lamp_turnoff_click",
        "loop": false
      }
    }
  },
  "c7a7215c": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 230,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 230,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 230,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 230,
          "layers": []
        },
        {
          "state": 4,
          "durationMs": 230,
          "layers": []
        },
        {
          "state": 5,
          "durationMs": 230,
          "layers": []
        }
      ],
      "loop": true,
      "sound": {
        "event": "aquarium_running",
        "loop": false
      }
    },
    "note": "Six marine-aquarium frames. Running clip uses exported non-loop flag.",
    "hint": "Rotate to see the other sides."
  },
  "47a99575": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Display corner graphic is a placement variant, not an animation. Shared plant/trash sounds omitted.",
    "hint": "Rotate to see the other sides."
  },
  "ad0b9dd6": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 350,
          "layers": [
            0
          ]
        },
        {
          "state": 0,
          "durationMs": 350,
          "layers": [
            1
          ]
        },
        {
          "state": 0,
          "durationMs": 350,
          "layers": [
            2
          ]
        }
      ],
      "loop": true,
      "sound": {
        "event": "stove_bubble",
        "loop": false
      }
    },
    "note": "Chop, then simmer; canning layers swap among working jar frames.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1800,
          "layers": []
        }
      ],
      "sound": {
        "event": "fruit_chop",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1800,
          "layers": []
        }
      ],
      "sound": {
        "event": "fruit_chop",
        "loop": false
      }
    }
  },
  "dfbb8259": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static vendor/cart. No matching mechanical or ambience clip exported; unrelated/shared voices omitted.",
    "hint": "Rotate to see the other sides."
  },
  "26e91ef5": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static table/display; place/get counter sounds only.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "counter_put_all",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "counter_get_all",
        "loop": false
      }
    }
  },
  "f219d380": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static vendor/cart. No matching mechanical or ambience clip exported; unrelated/shared voices omitted.",
    "hint": "Rotate to see the other sides."
  },
  "26ad0662": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static table/display; place/get counter sounds only.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "counter_put_all",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "counter_get_all",
        "loop": false
      }
    }
  },
  "58dde126": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 180,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 180,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 180,
          "layers": []
        }
      ],
      "loop": true,
      "sound": {
        "event": "hottub_running",
        "loop": false
      }
    },
    "note": "Named bubbling frames. Exported running clip plays once on activation, not silently forced into a loop.",
    "hint": "Click the object to interact.",
    "click": {
      "steps": [
        {
          "state": 5,
          "durationMs": 260,
          "layers": []
        },
        {
          "state": 6,
          "durationMs": 260,
          "layers": []
        },
        {
          "state": 7,
          "durationMs": 260,
          "layers": []
        }
      ],
      "sound": {
        "event": "hottub_running",
        "loop": false
      }
    }
  },
  "d4bf28f3": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": [
        0
      ]
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 1000,
          "layers": [
            0
          ]
        }
      ]
    },
    "note": "Bed gets in, holds sleeping appearance, then gets out; click makes the bed.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 3,
          "durationMs": 750,
          "layers": [
            0
          ]
        }
      ],
      "sound": {
        "event": "bed_get_inout",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1500,
          "layers": [
            0
          ]
        }
      ],
      "sound": {
        "event": "bed_make",
        "loop": false
      }
    },
    "stop": {
      "steps": [
        {
          "state": 2,
          "durationMs": 750,
          "layers": [
            0
          ]
        }
      ],
      "sound": {
        "event": "bed_get_out",
        "loop": false
      }
    }
  },
  "4699596d": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static vendor/cart. No matching mechanical or ambience clip exported; unrelated/shared voices omitted.",
    "hint": "Rotate to see the other sides."
  },
  "2d0a3de1": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Two counter graphics held as appearances, not a forced loop.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "counter_put_all",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 1,
          "durationMs": 600,
          "layers": []
        }
      ],
      "sound": {
        "event": "counter_get_all",
        "loop": false
      }
    }
  },
  "2c7dff0e": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 3,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Squeak, filling stream frames at rising water levels, then full bath. Drain descends on timer completion.",
    "hint": "Click to refill the bath.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 180,
          "sound": {
            "event": "tub1_sfaucetsqueak",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 5,
          "durationMs": 700,
          "sound": {
            "event": "tub1_stubfill",
            "loop": true,
            "channel": "water"
          },
          "layers": []
        },
        {
          "state": 9,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 13,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 6,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 10,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 14,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 7,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 11,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 15,
          "durationMs": 700,
          "layers": []
        }
      ]
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 180,
          "sound": {
            "event": "tub1_sfaucetsqueak",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 5,
          "durationMs": 700,
          "sound": {
            "event": "tub1_stubfill",
            "loop": true,
            "channel": "water"
          },
          "layers": []
        },
        {
          "state": 9,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 13,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 6,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 10,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 14,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 7,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 11,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 15,
          "durationMs": 700,
          "layers": []
        }
      ]
    },
    "stop": {
      "steps": [
        {
          "state": 3,
          "durationMs": 700,
          "sound": {
            "event": "tub1_sdrain",
            "loop": true,
            "channel": "water"
          },
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 700,
          "layers": []
        }
      ]
    }
  },
  "ebbd5efc": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Stocking then full buffet. Food portions are stages, never an endlessly looping animation.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 1,
          "durationMs": 2150,
          "layers": []
        }
      ],
      "sound": {
        "event": "caterer_restock_pro",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 2,
          "durationMs": 500,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 500,
          "layers": []
        },
        {
          "state": 4,
          "durationMs": 1000,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 2150,
          "sound": {
            "event": "caterer_restock_pro",
            "loop": false
          },
          "layers": []
        }
      ]
    }
  },
  "60d99178": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static igloo sleep site; only get-in sound.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "bed_get_inout",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "bed_make",
        "loop": false
      }
    }
  },
  "5bfb6140": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": [
        0
      ]
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 180,
          "layers": [
            0
          ]
        },
        {
          "state": 2,
          "durationMs": 180,
          "layers": [
            0
          ]
        },
        {
          "state": 3,
          "durationMs": 180,
          "layers": [
            0
          ]
        }
      ],
      "loop": true,
      "sound": {
        "event": "hottub_running",
        "loop": false
      }
    },
    "note": "Named bubbling frames. Exported running clip plays once on activation, not silently forced into a loop.",
    "hint": "Click the object to interact.",
    "click": {
      "steps": [
        {
          "state": 5,
          "durationMs": 260,
          "layers": [
            0
          ]
        },
        {
          "state": 6,
          "durationMs": 260,
          "layers": [
            0
          ]
        },
        {
          "state": 7,
          "durationMs": 260,
          "layers": [
            0
          ]
        }
      ],
      "sound": {
        "event": "hottub_running",
        "loop": false
      }
    }
  },
  "54c7f70d": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 400,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 400,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 400,
          "layers": []
        }
      ],
      "loop": true,
      "sound": {
        "event": "arcade_mars_music",
        "loop": false
      }
    },
    "note": "Correct game start, screen cycle with music, hit on click, win on completion. Other arcade game sounds omitted.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 2600,
          "layers": []
        }
      ],
      "sound": {
        "event": "arcade_mars_start",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 2,
          "durationMs": 1400,
          "layers": []
        }
      ],
      "sound": {
        "event": "arcade_mars_slap",
        "loop": false
      }
    },
    "stop": {
      "steps": [
        {
          "state": 0,
          "durationMs": 4500,
          "layers": []
        }
      ],
      "sound": {
        "event": "arcade_mars_win",
        "loop": false
      }
    }
  },
  "45caf478": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static vendor/cart. No matching mechanical or ambience clip exported; unrelated/shared voices omitted.",
    "hint": "Rotate to see the other sides."
  },
  "dd4e8362": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 400,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 400,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 400,
          "layers": []
        }
      ],
      "loop": true,
      "sound": {
        "event": "arcade_seal_music",
        "loop": false
      }
    },
    "note": "Correct game start, screen cycle with music, hit on click, win on completion. Other arcade game sounds omitted.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 3500,
          "layers": []
        }
      ],
      "sound": {
        "event": "arcade_seal_start",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 2,
          "durationMs": 1400,
          "layers": []
        }
      ],
      "sound": {
        "event": "arcade_seal_slap",
        "loop": false
      }
    },
    "stop": {
      "steps": [
        {
          "state": 0,
          "durationMs": 4500,
          "layers": []
        }
      ],
      "sound": {
        "event": "arcade_seal_win",
        "loop": false
      }
    }
  },
  "77d26881": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static exported board/slide; bounce precedes splash, no invented bend frames.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 750,
          "sound": {
            "event": "pool_dvboard_bounce",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 2800,
          "sound": {
            "event": "pool_dvboard_splash",
            "loop": false
          },
          "layers": []
        }
      ]
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 750,
          "sound": {
            "event": "pool_dvboard_bounce",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 2800,
          "sound": {
            "event": "pool_dvboard_splash",
            "loop": false
          },
          "layers": []
        }
      ]
    }
  },
  "bfc58dd0": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": [
        0
      ]
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 320,
          "layers": [
            0,
            4
          ]
        },
        {
          "state": 1,
          "durationMs": 320,
          "layers": [
            0,
            5
          ]
        },
        {
          "state": 1,
          "durationMs": 320,
          "layers": [
            0,
            6
          ]
        },
        {
          "state": 1,
          "durationMs": 320,
          "layers": [
            0,
            7
          ]
        },
        {
          "state": 1,
          "durationMs": 320,
          "layers": [
            0,
            9
          ]
        },
        {
          "state": 1,
          "durationMs": 320,
          "layers": [
            0,
            10
          ]
        },
        {
          "state": 1,
          "durationMs": 320,
          "layers": [
            0,
            11
          ]
        },
        {
          "state": 1,
          "durationMs": 320,
          "layers": [
            0,
            12
          ]
        }
      ],
      "loop": true,
      "sound": {
        "event": "waw_music",
        "loop": false
      }
    },
    "note": "Music starts, target overlays alternate; click popup then hit, then popdown.",
    "hint": "Click the object to interact.",
    "click": {
      "steps": [
        {
          "state": 1,
          "durationMs": 300,
          "layers": [
            0,
            4
          ],
          "sound": {
            "event": "waw_popup",
            "loop": false
          }
        },
        {
          "state": 2,
          "durationMs": 900,
          "layers": [
            0,
            14
          ],
          "sound": {
            "event": "waw_hit_sfx",
            "loop": false
          }
        },
        {
          "state": 1,
          "durationMs": 300,
          "layers": [
            0
          ],
          "sound": {
            "event": "waw_popdown",
            "loop": false
          }
        }
      ]
    },
    "stop": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1600,
          "layers": [
            0
          ]
        }
      ],
      "sound": {
        "event": "waw_gameover",
        "loop": false
      }
    }
  },
  "2644d3c7": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static vendor/cart. No matching mechanical or ambience clip exported; unrelated/shared voices omitted.",
    "hint": "Rotate to see the other sides."
  },
  "f126ef7c": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "extraStates": [
        1
      ],
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "extraStates": [
            1
          ],
          "layers": []
        }
      ]
    },
    "note": "Whale body and base are components, not consecutive animation frames; both are composited.",
    "hint": "Rotate to see the other sides."
  },
  "8613a26a": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": [
        0
      ]
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 230,
          "layers": [
            0
          ]
        },
        {
          "state": 3,
          "durationMs": 230,
          "layers": [
            0
          ]
        },
        {
          "state": 4,
          "durationMs": 230,
          "layers": [
            0
          ]
        },
        {
          "state": 5,
          "durationMs": 230,
          "layers": [
            0
          ]
        },
        {
          "state": 6,
          "durationMs": 230,
          "layers": [
            0
          ]
        },
        {
          "state": 7,
          "durationMs": 230,
          "layers": [
            0
          ]
        }
      ],
      "loop": true,
      "sound": {
        "event": "phone_ring_pay",
        "loop": false
      }
    },
    "note": "Ringing frames and payphone ring once. Click: pickup, dial, receiver ring, hangup. Shared character voices omitted.",
    "hint": "Click to pick up and dial.",
    "click": {
      "steps": [
        {
          "state": 2,
          "durationMs": 500,
          "sound": {
            "event": "phone1_spickup",
            "loop": false
          },
          "layers": [
            0
          ]
        },
        {
          "state": 2,
          "durationMs": 1200,
          "sound": {
            "event": "phone_dial",
            "loop": false
          },
          "layers": [
            0
          ]
        },
        {
          "state": 2,
          "durationMs": 700,
          "sound": {
            "event": "phone_ring_receiver",
            "loop": false
          },
          "layers": [
            0
          ]
        },
        {
          "state": 0,
          "durationMs": 550,
          "sound": {
            "event": "phone_hangup",
            "loop": false
          },
          "layers": [
            0
          ]
        }
      ]
    }
  },
  "4c103662": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 3,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Squeak, filling stream frames at rising water levels, then full bath. Drain descends on timer completion.",
    "hint": "Click to refill the bath.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 180,
          "sound": {
            "event": "tub1_sfaucetsqueak",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 5,
          "durationMs": 700,
          "sound": {
            "event": "tub1_stubfill",
            "loop": true,
            "channel": "water"
          },
          "layers": []
        },
        {
          "state": 9,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 13,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 6,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 10,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 14,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 7,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 11,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 15,
          "durationMs": 700,
          "layers": []
        }
      ]
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 180,
          "sound": {
            "event": "tub1_sfaucetsqueak",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 5,
          "durationMs": 700,
          "sound": {
            "event": "tub1_stubfill",
            "loop": true,
            "channel": "water"
          },
          "layers": []
        },
        {
          "state": 9,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 13,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 6,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 10,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 14,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 7,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 11,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 15,
          "durationMs": 700,
          "layers": []
        }
      ]
    },
    "stop": {
      "steps": [
        {
          "state": 3,
          "durationMs": 700,
          "sound": {
            "event": "tub1_sdrain",
            "loop": true,
            "channel": "water"
          },
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 700,
          "layers": []
        }
      ]
    }
  },
  "2ecdb068": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 3,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Squeak, filling stream frames at rising water levels, then full bath. Drain descends on timer completion.",
    "hint": "Click to refill the bath.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 180,
          "sound": {
            "event": "tub1_sfaucetsqueak",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 5,
          "durationMs": 700,
          "sound": {
            "event": "tub1_stubfill",
            "loop": true,
            "channel": "water"
          },
          "layers": []
        },
        {
          "state": 9,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 13,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 6,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 10,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 14,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 7,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 11,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 15,
          "durationMs": 700,
          "layers": []
        }
      ]
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 180,
          "sound": {
            "event": "tub1_sfaucetsqueak",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 5,
          "durationMs": 700,
          "sound": {
            "event": "tub1_stubfill",
            "loop": true,
            "channel": "water"
          },
          "layers": []
        },
        {
          "state": 9,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 13,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 6,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 10,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 14,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 7,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 11,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 15,
          "durationMs": 700,
          "layers": []
        }
      ]
    },
    "stop": {
      "steps": [
        {
          "state": 3,
          "durationMs": 700,
          "sound": {
            "event": "tub1_sdrain",
            "loop": true,
            "channel": "water"
          },
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 700,
          "layers": []
        }
      ]
    }
  },
  "fefda8d6": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static vendor/cart. No matching mechanical or ambience clip exported; unrelated/shared voices omitted.",
    "hint": "Rotate to see the other sides."
  },
  "9f733d4f": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static vendor/cart. No matching mechanical or ambience clip exported; unrelated/shared voices omitted.",
    "hint": "Rotate to see the other sides."
  },
  "acee4ba5": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 230,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 230,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 230,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 230,
          "layers": []
        },
        {
          "state": 4,
          "durationMs": 230,
          "layers": []
        },
        {
          "state": 5,
          "durationMs": 230,
          "layers": []
        }
      ],
      "loop": true,
      "sound": {
        "event": "aquarium_running",
        "loop": false
      }
    },
    "note": "Six marine-aquarium frames. Running clip uses exported non-loop flag.",
    "hint": "Rotate to see the other sides."
  },
  "645542df": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": [
        0,
        4,
        8
      ]
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 220,
          "layers": [
            0,
            4,
            8
          ]
        },
        {
          "state": 1,
          "durationMs": 220,
          "layers": [
            1,
            5,
            8
          ]
        },
        {
          "state": 2,
          "durationMs": 220,
          "layers": [
            2,
            6,
            8
          ]
        },
        {
          "state": 3,
          "durationMs": 220,
          "layers": [
            3,
            7,
            8
          ]
        },
        {
          "state": 4,
          "durationMs": 220,
          "layers": [
            0,
            4,
            8
          ]
        },
        {
          "state": 5,
          "durationMs": 220,
          "layers": [
            1,
            5,
            8
          ]
        },
        {
          "state": 6,
          "durationMs": 220,
          "layers": [
            2,
            6,
            8
          ]
        },
        {
          "state": 7,
          "durationMs": 220,
          "layers": [
            3,
            7,
            8
          ]
        }
      ],
      "loop": true,
      "sound": {
        "event": "scuba_loop",
        "loop": false
      }
    },
    "note": "Airlock graphic cycle and propeller layer cycle, with scuba machinery.",
    "hint": "Rotate to see the other sides."
  },
  "e89c0e48": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 110,
          "layers": [
            0
          ]
        },
        {
          "state": 0,
          "durationMs": 110,
          "layers": [
            1
          ]
        },
        {
          "state": 0,
          "durationMs": 110,
          "layers": [
            2
          ]
        },
        {
          "state": 0,
          "durationMs": 110,
          "layers": [
            3
          ]
        }
      ],
      "loop": true,
      "sound": {
        "event": "skydive_loop_lp",
        "loop": false
      }
    },
    "note": "Fan rotor layers; motor starts, runs, then winds down on completion.",
    "hint": "Rotate to see the other sides.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 4100,
          "layers": []
        }
      ],
      "sound": {
        "event": "skydive_loop_start",
        "loop": false
      }
    },
    "stop": {
      "steps": [
        {
          "state": 0,
          "durationMs": 4700,
          "layers": []
        }
      ],
      "sound": {
        "event": "skydive_loop_end",
        "loop": false
      }
    }
  },
  "cbef938d": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 250,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 250,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 250,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 250,
          "layers": []
        },
        {
          "state": 4,
          "durationMs": 250,
          "layers": []
        },
        {
          "state": 5,
          "durationMs": 250,
          "layers": []
        }
      ],
      "loop": true
    },
    "note": "Smoothie machine graphic sequence, no matching machine sound in export.",
    "hint": "Rotate to see the other sides."
  },
  "1772dd4f": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 180,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 180,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 180,
          "layers": []
        }
      ],
      "loop": true,
      "sound": {
        "event": "hottub_running",
        "loop": false
      }
    },
    "note": "Named bubbling frames. Exported running clip plays once on activation, not silently forced into a loop.",
    "hint": "Click the object to interact.",
    "click": {
      "steps": [
        {
          "state": 1,
          "durationMs": 260,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 260,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 260,
          "layers": []
        }
      ],
      "sound": {
        "event": "hottub_running",
        "loop": false
      }
    }
  },
  "bb0846ea": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 170,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 170,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 170,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 170,
          "layers": []
        },
        {
          "state": 4,
          "durationMs": 170,
          "layers": []
        },
        {
          "state": 5,
          "durationMs": 170,
          "layers": []
        },
        {
          "state": 6,
          "durationMs": 170,
          "layers": []
        },
        {
          "state": 7,
          "durationMs": 170,
          "layers": []
        }
      ],
      "loop": true,
      "sound": {
        "event": "fountainhd_loop"
      }
    },
    "note": "Eight fountain water states, large-fountain loop; coin sound only on click.",
    "hint": "Click the object to interact.",
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 650,
          "layers": []
        }
      ],
      "sound": {
        "event": "fountainhd_coin",
        "loop": false
      }
    }
  },
  "74d93e95": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static table/display; place/get counter sounds only.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "counter_put_all",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "counter_get_all",
        "loop": false
      }
    }
  },
  "cbeff420": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static vendor/cart. No matching mechanical or ambience clip exported; unrelated/shared voices omitted.",
    "hint": "Rotate to see the other sides."
  },
  "eea95801": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "steamer_loop",
        "loop": false
      }
    },
    "note": "Recline/open sequence then steam unit sound; no invented steam frames.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 1,
          "durationMs": 220,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 220,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 220,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 220,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 220,
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 220,
          "layers": []
        }
      ],
      "sound": {
        "event": "chair_recline",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 1,
          "durationMs": 220,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 220,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 220,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 220,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 220,
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 220,
          "layers": []
        }
      ],
      "sound": {
        "event": "chair_recline",
        "loop": false
      }
    }
  },
  "a5004e8c": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": [
        16,
        17,
        18,
        19
      ]
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 240,
          "layers": [
            16,
            17,
            18,
            19,
            0
          ]
        },
        {
          "state": 0,
          "durationMs": 240,
          "layers": [
            16,
            17,
            18,
            19,
            1
          ]
        },
        {
          "state": 0,
          "durationMs": 240,
          "layers": [
            16,
            17,
            18,
            19,
            2
          ]
        },
        {
          "state": 0,
          "durationMs": 240,
          "layers": [
            16,
            17,
            18,
            19,
            3
          ]
        }
      ],
      "loop": true,
      "sound": {
        "event": "oxybar_loop",
        "loop": false
      }
    },
    "note": "Keep structural/default stool layers; animate only oxygen tubing layer variants.",
    "hint": "Rotate to see the other sides."
  },
  "52ae7a4e": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": [
        27
      ]
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 300,
          "layers": [
            27,
            0
          ]
        },
        {
          "state": 0,
          "durationMs": 300,
          "layers": [
            27,
            1
          ]
        },
        {
          "state": 0,
          "durationMs": 300,
          "layers": [
            27,
            2
          ]
        },
        {
          "state": 0,
          "durationMs": 300,
          "layers": [
            27,
            3
          ]
        }
      ],
      "loop": true,
      "sound": {
        "event": "mudbath_milsul_swish_a",
        "loop": false
      }
    },
    "note": "Fill before swishing water overlay frames; drain on completion.",
    "hint": "Rotate to see the other sides.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 8500,
          "layers": [
            27
          ]
        }
      ],
      "sound": {
        "event": "mudbath_milsul_fill",
        "loop": false
      }
    },
    "stop": {
      "steps": [
        {
          "state": 0,
          "durationMs": 4300,
          "layers": [
            27
          ]
        }
      ],
      "sound": {
        "event": "mudbath_milsul_drain",
        "loop": false
      }
    }
  },
  "384c487b": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 180,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 180,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 180,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 180,
          "layers": []
        },
        {
          "state": 4,
          "durationMs": 180,
          "layers": []
        }
      ],
      "loop": true
    },
    "note": "Five water-wall bubble frames; generic kinetic sculpture sound omitted.",
    "hint": "Rotate to see the other sides."
  },
  "1b833d24": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 350,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 350,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 350,
          "layers": []
        }
      ],
      "loop": true
    },
    "note": "TV power-on precedes action screen frames. Click changes to cartoon channel. No programme audio exported.",
    "hint": "Click to change channel.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 650,
          "layers": []
        }
      ],
      "sound": {
        "event": "tv_exp_turnon",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 10,
          "durationMs": 350,
          "layers": []
        },
        {
          "state": 11,
          "durationMs": 350,
          "layers": []
        },
        {
          "state": 12,
          "durationMs": 350,
          "layers": []
        },
        {
          "state": 10,
          "durationMs": 350,
          "layers": []
        },
        {
          "state": 11,
          "durationMs": 350,
          "layers": []
        },
        {
          "state": 12,
          "durationMs": 350,
          "layers": []
        }
      ],
      "sound": {
        "event": "tv_exp_switch",
        "loop": false
      }
    },
    "stop": {
      "steps": [
        {
          "state": 0,
          "durationMs": 800,
          "layers": []
        }
      ],
      "sound": {
        "event": "tv_exp_turnoff",
        "loop": false
      }
    }
  },
  "5fa381c1": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 350,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 350,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 350,
          "layers": []
        }
      ],
      "loop": true
    },
    "note": "TV power-on precedes action screen frames. Click changes to cartoon channel. No programme audio exported.",
    "hint": "Click to change channel.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1350,
          "layers": []
        }
      ],
      "sound": {
        "event": "tv_c_turnon",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 10,
          "durationMs": 350,
          "layers": []
        },
        {
          "state": 11,
          "durationMs": 350,
          "layers": []
        },
        {
          "state": 12,
          "durationMs": 350,
          "layers": []
        },
        {
          "state": 10,
          "durationMs": 350,
          "layers": []
        },
        {
          "state": 11,
          "durationMs": 350,
          "layers": []
        },
        {
          "state": 12,
          "durationMs": 350,
          "layers": []
        }
      ],
      "sound": {
        "event": "tv_c_switch",
        "loop": false
      }
    },
    "stop": {
      "steps": [
        {
          "state": 0,
          "durationMs": 800,
          "layers": []
        }
      ],
      "sound": {
        "event": "tv_c_turnoff",
        "loop": false
      }
    }
  },
  "fc8d548b": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 350,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 350,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 350,
          "layers": []
        }
      ],
      "loop": true
    },
    "note": "TV power-on precedes action screen frames. Click changes to cartoon channel. No programme audio exported.",
    "hint": "Click to change channel.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 650,
          "layers": []
        }
      ],
      "sound": {
        "event": "tv_exp_turnon",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 10,
          "durationMs": 350,
          "layers": []
        },
        {
          "state": 11,
          "durationMs": 350,
          "layers": []
        },
        {
          "state": 12,
          "durationMs": 350,
          "layers": []
        },
        {
          "state": 10,
          "durationMs": 350,
          "layers": []
        },
        {
          "state": 11,
          "durationMs": 350,
          "layers": []
        },
        {
          "state": 12,
          "durationMs": 350,
          "layers": []
        }
      ],
      "sound": {
        "event": "tv_exp_switch",
        "loop": false
      }
    },
    "stop": {
      "steps": [
        {
          "state": 0,
          "durationMs": 800,
          "layers": []
        }
      ],
      "sound": {
        "event": "tv_exp_turnoff",
        "loop": false
      }
    }
  },
  "880bb75e": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 350,
          "layers": [
            0
          ]
        },
        {
          "state": 1,
          "durationMs": 350,
          "layers": [
            1
          ]
        },
        {
          "state": 1,
          "durationMs": 350,
          "layers": [
            2
          ]
        },
        {
          "state": 2,
          "durationMs": 500,
          "layers": [
            3
          ]
        }
      ],
      "loop": true
    },
    "note": "Press color/magic graphics with production layers and magic effect; no unrelated counter sounds.",
    "hint": "Click the object to interact.",
    "click": {
      "steps": [
        {
          "state": 2,
          "durationMs": 4700,
          "layers": []
        }
      ],
      "sound": {
        "event": "ch_shedskin_suc",
        "loop": false
      }
    }
  },
  "8e8d9ca9": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 300,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 300,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 300,
          "layers": []
        },
        {
          "state": 4,
          "durationMs": 300,
          "layers": []
        }
      ],
      "loop": true,
      "sound": {
        "event": "cyclops_loop",
        "loop": false
      }
    },
    "note": "Coin precedes cyclops game cycle. Hit on click, end sound on completion.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 3600,
          "layers": []
        }
      ],
      "sound": {
        "event": "cyclops_coin",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 3,
          "durationMs": 1850,
          "layers": []
        }
      ],
      "sound": {
        "event": "cyclops_hit",
        "loop": false
      }
    },
    "stop": {
      "steps": [
        {
          "state": 0,
          "durationMs": 2100,
          "layers": []
        }
      ],
      "sound": {
        "event": "cyclops_end",
        "loop": false
      }
    }
  },
  "aed36fcb": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 200,
          "layers": [
            0
          ]
        },
        {
          "state": 0,
          "durationMs": 200,
          "layers": [
            1
          ]
        },
        {
          "state": 0,
          "durationMs": 200,
          "layers": [
            2
          ]
        },
        {
          "state": 0,
          "durationMs": 200,
          "layers": [
            3
          ]
        },
        {
          "state": 0,
          "durationMs": 200,
          "layers": [
            4
          ]
        }
      ],
      "loop": true
    },
    "note": "Candy floss spinner overlay cycles; no matching machine sound exported.",
    "hint": "Rotate to see the other sides."
  },
  "e9a90c22": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 220,
          "layers": [
            0
          ]
        },
        {
          "state": 0,
          "durationMs": 220,
          "layers": [
            1
          ]
        },
        {
          "state": 0,
          "durationMs": 220,
          "layers": [
            2
          ]
        },
        {
          "state": 0,
          "durationMs": 220,
          "layers": [
            3
          ]
        }
      ],
      "loop": true
    },
    "note": "Crafting effect layer cycle; generic counter sounds omitted.",
    "hint": "Rotate to see the other sides."
  },
  "6691c3d8": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static vendor/cart. No matching mechanical or ambience clip exported; unrelated/shared voices omitted.",
    "hint": "Rotate to see the other sides."
  },
  "17fee456": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": [
        0
      ]
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 350,
          "layers": [
            0
          ]
        },
        {
          "state": 0,
          "durationMs": 350,
          "layers": [
            1
          ]
        },
        {
          "state": 0,
          "durationMs": 350,
          "layers": [
            2
          ]
        },
        {
          "state": 0,
          "durationMs": 350,
          "layers": [
            1
          ]
        }
      ],
      "loop": true,
      "sound": {
        "event": "asp_egg_loop",
        "loop": false
      }
    },
    "note": "Egg shell overlays cycle; incubating sound then crack/hatch interaction. No fabricated dragon or phone voices.",
    "hint": "Click to hatch the egg.",
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 400,
          "layers": [
            2
          ]
        },
        {
          "state": 0,
          "durationMs": 1750,
          "layers": [
            3
          ],
          "sound": {
            "event": "dragon_nest_hatch",
            "loop": false
          }
        },
        {
          "state": 0,
          "durationMs": 1500,
          "layers": [
            4
          ]
        }
      ]
    }
  },
  "e69e35c0": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 250,
          "layers": [
            0
          ]
        },
        {
          "state": 0,
          "durationMs": 250,
          "layers": [
            1
          ]
        },
        {
          "state": 0,
          "durationMs": 250,
          "layers": [
            2
          ]
        },
        {
          "state": 0,
          "durationMs": 250,
          "layers": [
            3
          ]
        },
        {
          "state": 0,
          "durationMs": 250,
          "layers": [
            4
          ]
        },
        {
          "state": 0,
          "durationMs": 250,
          "layers": [
            5
          ]
        },
        {
          "state": 0,
          "durationMs": 250,
          "layers": [
            6
          ]
        }
      ],
      "loop": true
    },
    "note": "Serving pot overlay frames; no matching cooking clip exported.",
    "hint": "Rotate to see the other sides."
  },
  "b1230866": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 250,
          "layers": [
            0
          ]
        },
        {
          "state": 0,
          "durationMs": 250,
          "layers": [
            1
          ]
        },
        {
          "state": 0,
          "durationMs": 250,
          "layers": [
            2
          ]
        },
        {
          "state": 0,
          "durationMs": 250,
          "layers": [
            3
          ]
        },
        {
          "state": 0,
          "durationMs": 250,
          "layers": [
            4
          ]
        },
        {
          "state": 0,
          "durationMs": 250,
          "layers": [
            5
          ]
        },
        {
          "state": 0,
          "durationMs": 250,
          "layers": [
            6
          ]
        }
      ],
      "loop": true
    },
    "note": "Serving pot overlay frames; no matching cooking clip exported.",
    "hint": "Rotate to see the other sides."
  },
  "f784f104": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": [
        0
      ]
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 1000,
          "layers": [
            0
          ]
        }
      ]
    },
    "note": "Bed gets in, holds sleeping appearance, then gets out; click makes the bed.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 3,
          "durationMs": 750,
          "layers": [
            0
          ]
        }
      ],
      "sound": {
        "event": "bed_get_inout",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1500,
          "layers": [
            0
          ]
        }
      ],
      "sound": {
        "event": "bed_make",
        "loop": false
      }
    },
    "stop": {
      "steps": [
        {
          "state": 2,
          "durationMs": 750,
          "layers": [
            0
          ]
        }
      ],
      "sound": {
        "event": "bed_get_out",
        "loop": false
      }
    }
  },
  "765bcec0": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": [
        0,
        1,
        2
      ]
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 500,
          "layers": [
            0,
            1,
            2
          ],
          "layerOffsets": {
            "1": {
              "y": 0
            }
          },
          "sound": {
            "event": "ex_machine_bar_down",
            "loop": false
          }
        },
        {
          "state": 0,
          "durationMs": 500,
          "layers": [
            0,
            1,
            2
          ],
          "layerOffsets": {
            "1": {
              "y": -6
            }
          },
          "sound": {
            "event": "ex_machine_bar_up",
            "loop": false
          }
        }
      ],
      "loop": true
    },
    "note": "Churn barrel stays fixed; dasher moves by layer offset with up/down effects in order.",
    "hint": "Rotate to see the other sides."
  },
  "7387f3a2": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 220,
          "layers": [
            0,
            3
          ]
        },
        {
          "state": 0,
          "durationMs": 220,
          "layers": [
            1,
            4
          ]
        },
        {
          "state": 0,
          "durationMs": 220,
          "layers": [
            2,
            5
          ]
        }
      ],
      "loop": true,
      "sound": {
        "event": "popcorn_make",
        "loop": false
      }
    },
    "note": "Popcorn layers animate over the intact machine; popcorn-making clip once. Broken state excluded.",
    "hint": "Click the object to interact.",
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 600,
          "layers": []
        }
      ],
      "sound": {
        "event": "fridge_get_snack",
        "loop": false
      }
    }
  },
  "f2010049": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "stove_bubble"
      }
    },
    "note": "Gas ignition precedes simmer. Export has no lit graphic or separate flame layer.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 850,
          "layers": []
        }
      ],
      "sound": {
        "event": "stove_expensive_gason",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1050,
          "layers": []
        }
      ],
      "sound": {
        "event": "stove_sstir",
        "loop": false
      }
    }
  },
  "2077e7de": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static vendor/cart. No matching mechanical or ambience clip exported; unrelated/shared voices omitted.",
    "hint": "Rotate to see the other sides."
  },
  "2a3d8714": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 3,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Book opens in thirds, holds open. No page-turn sound was exported; counter events omitted.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 200,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 200,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 200,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 200,
          "layers": []
        }
      ]
    },
    "click": {
      "steps": [
        {
          "state": 2,
          "durationMs": 180,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 180,
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 180,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 180,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 180,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 180,
          "layers": []
        }
      ]
    }
  },
  "578f5050": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static vendor/cart. No matching mechanical or ambience clip exported; unrelated/shared voices omitted.",
    "hint": "Rotate to see the other sides."
  },
  "2b956ab9": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": [
        0
      ]
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 240,
          "layers": [
            1
          ]
        },
        {
          "state": 0,
          "durationMs": 240,
          "layers": [
            2
          ]
        },
        {
          "state": 0,
          "durationMs": 240,
          "layers": [
            3
          ]
        },
        {
          "state": 0,
          "durationMs": 240,
          "layers": [
            4
          ]
        },
        {
          "state": 0,
          "durationMs": 240,
          "layers": [
            5
          ]
        },
        {
          "state": 0,
          "durationMs": 240,
          "layers": [
            6
          ]
        }
      ],
      "loop": true
    },
    "note": "Coaster base stays fixed; moving car/effect layers cycle. Generic sculpture and clown-fire events are unrelated and omitted.",
    "hint": "Rotate to see the other sides."
  },
  "4be4809a": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": [
        0
      ]
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 240,
          "layers": [
            1
          ]
        },
        {
          "state": 0,
          "durationMs": 240,
          "layers": [
            2
          ]
        },
        {
          "state": 0,
          "durationMs": 240,
          "layers": [
            3
          ]
        }
      ],
      "loop": true
    },
    "note": "Coaster base stays fixed; moving car/effect layers cycle. Generic sculpture and clown-fire events are unrelated and omitted.",
    "hint": "Rotate to see the other sides."
  },
  "41e1f6f3": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": [
        0
      ]
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 240,
          "layers": [
            1
          ]
        },
        {
          "state": 0,
          "durationMs": 240,
          "layers": [
            2
          ]
        }
      ],
      "loop": true
    },
    "note": "Coaster base stays fixed; moving car/effect layers cycle. Generic sculpture and clown-fire events are unrelated and omitted.",
    "hint": "Rotate to see the other sides."
  },
  "ebdc8225": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 180,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 180,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 180,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 180,
          "layers": []
        },
        {
          "state": 4,
          "durationMs": 180,
          "layers": []
        }
      ],
      "loop": true,
      "sound": {
        "event": "fountain_tinkle",
        "loop": false
      }
    },
    "note": "Five named villa water frames; fountain sound uses exported non-loop flag.",
    "hint": "Rotate to see the other sides."
  },
  "6e0ec37e": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 3,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Squeak, filling stream frames at rising water levels, then full bath. Drain descends on timer completion.",
    "hint": "Click to refill the bath.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 180,
          "sound": {
            "event": "tub1_sfaucetsqueak",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 5,
          "durationMs": 700,
          "sound": {
            "event": "tub1_stubfill",
            "loop": true,
            "channel": "water"
          },
          "layers": []
        },
        {
          "state": 9,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 13,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 6,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 10,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 14,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 7,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 11,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 15,
          "durationMs": 700,
          "layers": []
        }
      ]
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 180,
          "sound": {
            "event": "tub1_sfaucetsqueak",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 5,
          "durationMs": 700,
          "sound": {
            "event": "tub1_stubfill",
            "loop": true,
            "channel": "water"
          },
          "layers": []
        },
        {
          "state": 9,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 13,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 6,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 10,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 14,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 7,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 11,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 15,
          "durationMs": 700,
          "layers": []
        }
      ]
    },
    "stop": {
      "steps": [
        {
          "state": 3,
          "durationMs": 700,
          "sound": {
            "event": "tub1_sdrain",
            "loop": true,
            "channel": "water"
          },
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 700,
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 700,
          "layers": []
        }
      ]
    }
  },
  "dcb5a769": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": [
        0
      ]
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 1000,
          "layers": [
            0
          ]
        }
      ]
    },
    "note": "Bed gets in, holds sleeping appearance, then gets out; click makes the bed.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 3,
          "durationMs": 750,
          "layers": [
            0
          ]
        }
      ],
      "sound": {
        "event": "bed_get_inout",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1500,
          "layers": [
            0
          ]
        }
      ],
      "sound": {
        "event": "bed_make",
        "loop": false
      }
    },
    "stop": {
      "steps": [
        {
          "state": 2,
          "durationMs": 750,
          "layers": [
            0
          ]
        }
      ],
      "sound": {
        "event": "bed_get_out",
        "loop": false
      }
    }
  },
  "abfc34d3": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static chair, single sit sound, no fabricated rocking.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "chair_sit_unmovable",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "chair_sit_unmovable",
        "loop": false
      }
    }
  },
  "c14849ac": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Gnome rests normally during the timer. Click triggers explosion frames and sound, then returns to intact gnome.",
    "hint": "Click for the gnome explosion.",
    "click": {
      "steps": [
        {
          "state": 1,
          "durationMs": 140,
          "sound": {
            "event": "gnome_explosion",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 140,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 200,
          "layers": []
        },
        {
          "state": 4,
          "durationMs": 950,
          "layers": []
        },
        {
          "state": 5,
          "durationMs": 500,
          "layers": []
        }
      ]
    }
  },
  "33a951ec": {
    "idle": {
      "state": 12,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 12,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Food remains a held meal, not a loop through portions/dirt levels. Eating sound on click only.",
    "hint": "Click the object to interact.",
    "click": {
      "steps": [
        {
          "state": 12,
          "durationMs": 1200,
          "layers": []
        }
      ],
      "sound": {
        "event": "meal_utinsels",
        "loop": false
      }
    }
  },
  "331f2000": {
    "idle": {
      "state": 19,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 19,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Food remains a held meal, not a loop through portions/dirt levels. Eating sound on click only.",
    "hint": "Click the object to interact.",
    "click": {
      "steps": [
        {
          "state": 19,
          "durationMs": 1200,
          "layers": []
        }
      ],
      "sound": {
        "event": "food_snack_eat",
        "loop": false
      }
    }
  },
  "3c6b497b": {
    "idle": {
      "state": 33,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 35,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Closed, half open, open. Pizza portions never autoplay in a loop. Opening sound is a provisional association.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 33,
          "durationMs": 220,
          "layers": []
        },
        {
          "state": 34,
          "durationMs": 220,
          "layers": []
        },
        {
          "state": 35,
          "durationMs": 220,
          "layers": []
        }
      ],
      "sound": {
        "event": "pizza_gooey",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 34,
          "durationMs": 200,
          "layers": []
        },
        {
          "state": 33,
          "durationMs": 200,
          "layers": []
        },
        {
          "state": 34,
          "durationMs": 200,
          "layers": []
        },
        {
          "state": 35,
          "durationMs": 200,
          "layers": []
        }
      ],
      "sound": {
        "event": "pizza_gooey",
        "loop": false
      }
    }
  },
  "87d00adc": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static sofa; a single appropriate upholstery creak only.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "sofa1_ssqueak",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ],
      "sound": {
        "event": "sofa1_ssqueak",
        "loop": false
      }
    }
  },
  "31a0e42c": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Static exported board/slide; bounce precedes splash, no invented bend frames.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 750,
          "sound": {
            "event": "pool_dvboard_bounce",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 2800,
          "sound": {
            "event": "pool_dvboard_splash",
            "loop": false
          },
          "layers": []
        }
      ]
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 750,
          "sound": {
            "event": "pool_dvboard_bounce",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 2800,
          "sound": {
            "event": "pool_dvboard_splash",
            "loop": false
          },
          "layers": []
        }
      ]
    }
  },
  "70f69082": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": []
        }
      ]
    },
    "note": "Dollhouse has one static graphic. Repo/cop effects belong to shared NPC code and are omitted.",
    "hint": "Rotate to see the other sides."
  },
  "81179ab3": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": [
        0
      ]
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 1000,
          "layers": [
            0
          ]
        }
      ]
    },
    "note": "Bed gets in, holds sleeping appearance, then gets out; click makes the bed.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 3,
          "durationMs": 750,
          "layers": [
            0
          ]
        }
      ],
      "sound": {
        "event": "bed_get_inout",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1500,
          "layers": [
            0
          ]
        }
      ],
      "sound": {
        "event": "bed_make",
        "loop": false
      }
    },
    "stop": {
      "steps": [
        {
          "state": 2,
          "durationMs": 750,
          "layers": [
            0
          ]
        }
      ],
      "sound": {
        "event": "bed_get_out",
        "loop": false
      }
    }
  }
};
