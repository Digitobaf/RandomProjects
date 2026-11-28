/* Authored, editable object sequences; durations are milliseconds. */
window.SIMS_BEHAVIORS = {
  "34fe4e17": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": [],
      "water": 0
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1000,
          "layers": [],
          "water": 1
        }
      ]
    },
    "note": "Basin-only rising water; fill sound and motion once, then water stays filled. No opaque full-sink water/suds frame.",
    "hint": "Click to fill the basin once.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 180,
          "layers": [],
          "sound": {
            "event": "tub1_sfaucetsqueak",
            "loop": false
          }
        },
        {
          "state": 0,
          "durationMs": 3500,
          "layers": [],
          "water": {
            "from": 0,
            "to": 1
          },
          "sound": {
            "event": "sink_filling",
            "loop": false
          }
        }
      ]
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 180,
          "layers": [],
          "sound": {
            "event": "tub1_sfaucetsqueak",
            "loop": false
          }
        },
        {
          "state": 0,
          "durationMs": 3500,
          "layers": [],
          "water": {
            "from": 0,
            "to": 1
          },
          "sound": {
            "event": "sink_filling",
            "loop": false
          }
        }
      ],
      "returnAppearance": {
        "state": 0,
        "durationMs": 250,
        "layers": [],
        "water": 1
      }
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
      },
      "fill": {
        "regions": {
          "NE": [
            [
              22,
              15
            ],
            [
              37,
              10
            ],
            [
              54,
              15
            ],
            [
              57,
              20
            ],
            [
              45,
              27
            ],
            [
              33,
              28
            ],
            [
              23,
              23
            ]
          ],
          "SE": [
            [
              21,
              18
            ],
            [
              29,
              13
            ],
            [
              43,
              12
            ],
            [
              54,
              15
            ],
            [
              54,
              20
            ],
            [
              45,
              26
            ],
            [
              33,
              28
            ],
            [
              24,
              25
            ],
            [
              20,
              22
            ]
          ],
          "SW": [
            [
              15,
              16
            ],
            [
              27,
              12
            ],
            [
              39,
              15
            ],
            [
              49,
              20
            ],
            [
              49,
              24
            ],
            [
              42,
              28
            ],
            [
              32,
              29
            ],
            [
              22,
              26
            ],
            [
              15,
              21
            ]
          ],
          "NW": [
            [
              14,
              15
            ],
            [
              25,
              12
            ],
            [
              35,
              14
            ],
            [
              45,
              19
            ],
            [
              46,
              23
            ],
            [
              38,
              28
            ],
            [
              25,
              26
            ],
            [
              16,
              21
            ]
          ]
        },
        "color": "#9ac7d8",
        "opacity": 0.64
      },
      "protect": [
        "gold"
      ],
      "nativeRegions": {
        "NE": [
          [
            22,
            15
          ],
          [
            37,
            10
          ],
          [
            54,
            15
          ],
          [
            57,
            20
          ],
          [
            45,
            27
          ],
          [
            33,
            28
          ],
          [
            23,
            23
          ]
        ],
        "SE": [
          [
            21,
            18
          ],
          [
            29,
            13
          ],
          [
            43,
            12
          ],
          [
            54,
            15
          ],
          [
            54,
            20
          ],
          [
            45,
            26
          ],
          [
            33,
            28
          ],
          [
            24,
            25
          ],
          [
            20,
            22
          ]
        ],
        "SW": [
          [
            15,
            16
          ],
          [
            27,
            12
          ],
          [
            39,
            15
          ],
          [
            49,
            20
          ],
          [
            49,
            24
          ],
          [
            42,
            28
          ],
          [
            32,
            29
          ],
          [
            22,
            26
          ],
          [
            15,
            21
          ]
        ],
        "NW": [
          [
            14,
            15
          ],
          [
            25,
            12
          ],
          [
            35,
            14
          ],
          [
            45,
            19
          ],
          [
            46,
            23
          ],
          [
            38,
            28
          ],
          [
            25,
            26
          ],
          [
            16,
            21
          ]
        ]
      }
    },
    "endAppearance": {
      "state": 0,
      "durationMs": 250,
      "layers": [],
      "water": 1
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "durationMs": 250,
        "layers": []
      }
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
    "note": "One fixed fountain body with a water-only mask; no per-frame AI body textures.",
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "durationMs": 250,
        "layers": []
      }
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
    "note": "Fixed casing/stand/keyboard; original native screen frames clipped to the display only, including power-on. Back views stay still.",
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
      },
      "regions": {
        "NE": [],
        "SE": [
          [
            45,
            18
          ],
          [
            67,
            7
          ],
          [
            69,
            7
          ],
          [
            70,
            17
          ],
          [
            70,
            28
          ],
          [
            69,
            30
          ],
          [
            49,
            40
          ],
          [
            46,
            40
          ],
          [
            45,
            28
          ]
        ],
        "SW": [
          [
            39,
            38
          ],
          [
            40,
            23
          ],
          [
            41,
            21
          ],
          [
            50,
            25
          ],
          [
            63,
            32
          ],
          [
            64,
            33
          ],
          [
            64,
            48
          ],
          [
            63,
            55
          ],
          [
            61,
            55
          ],
          [
            41,
            45
          ],
          [
            39,
            43
          ]
        ],
        "NW": []
      },
      "nativeRegions": {
        "NE": [],
        "SE": [
          [
            45,
            18
          ],
          [
            67,
            7
          ],
          [
            69,
            7
          ],
          [
            70,
            17
          ],
          [
            70,
            28
          ],
          [
            69,
            30
          ],
          [
            49,
            40
          ],
          [
            46,
            40
          ],
          [
            45,
            28
          ]
        ],
        "SW": [
          [
            39,
            38
          ],
          [
            40,
            23
          ],
          [
            41,
            21
          ],
          [
            50,
            25
          ],
          [
            63,
            32
          ],
          [
            64,
            33
          ],
          [
            64,
            48
          ],
          [
            63,
            55
          ],
          [
            61,
            55
          ],
          [
            41,
            45
          ],
          [
            39,
            43
          ]
        ],
        "NW": []
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
    "note": "Only NE and NW rotations remain; NE is the starting view because SE was explicitly removed.",
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 1,
        "layers": []
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
    "note": "Window glass uses native geometry; warm light is clipped inside the window with no shadow/glow bleed.",
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
      "color": "#ffcb71",
      "opacity": 0.5,
      "polygons": {
        "NE": [],
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
            45
          ],
          [
            33,
            53
          ]
        ],
        "SW": [
          [
            18,
            27
          ],
          [
            34,
            35
          ],
          [
            34,
            47
          ],
          [
            18,
            39
          ]
        ],
        "NW": []
      },
      "blur": 0
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
      },
      "nativeRegions": {
        "NE": [],
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
            45
          ],
          [
            33,
            53
          ]
        ],
        "SW": [
          [
            18,
            27
          ],
          [
            34,
            35
          ],
          [
            34,
            47
          ],
          [
            18,
            39
          ]
        ],
        "NW": []
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
    "note": "Only the water level/flow changes; one fill sequence with one fill clip, then a full still bath. No animated metal textures.",
    "hint": "Click to refill the tub.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 180,
          "layers": [],
          "sound": {
            "event": "tub1_sfaucetsqueak",
            "loop": false
          }
        },
        {
          "state": 5,
          "durationMs": 1325,
          "layers": [],
          "sound": {
            "event": "tub1_stubfill",
            "loop": false,
            "channel": "water"
          }
        },
        {
          "state": 9,
          "durationMs": 1325,
          "layers": []
        },
        {
          "state": 13,
          "durationMs": 1325,
          "layers": []
        },
        {
          "state": 6,
          "durationMs": 1325,
          "layers": []
        },
        {
          "state": 10,
          "durationMs": 1325,
          "layers": []
        },
        {
          "state": 14,
          "durationMs": 1325,
          "layers": []
        },
        {
          "state": 7,
          "durationMs": 1325,
          "layers": []
        },
        {
          "state": 11,
          "durationMs": 1325,
          "layers": []
        },
        {
          "state": 15,
          "durationMs": 1325,
          "layers": []
        }
      ]
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 180,
          "layers": [],
          "sound": {
            "event": "tub1_sfaucetsqueak",
            "loop": false
          }
        },
        {
          "state": 5,
          "durationMs": 1325,
          "layers": [],
          "sound": {
            "event": "tub1_stubfill",
            "loop": false,
            "channel": "water"
          }
        },
        {
          "state": 9,
          "durationMs": 1325,
          "layers": []
        },
        {
          "state": 13,
          "durationMs": 1325,
          "layers": []
        },
        {
          "state": 6,
          "durationMs": 1325,
          "layers": []
        },
        {
          "state": 10,
          "durationMs": 1325,
          "layers": []
        },
        {
          "state": 14,
          "durationMs": 1325,
          "layers": []
        },
        {
          "state": 7,
          "durationMs": 1325,
          "layers": []
        },
        {
          "state": 11,
          "durationMs": 1325,
          "layers": []
        },
        {
          "state": 15,
          "durationMs": 1325,
          "layers": []
        }
      ],
      "returnAppearance": {
        "state": 3,
        "durationMs": 250,
        "layers": []
      }
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
      },
      "regions": {
        "NE": [
          [
            10,
            46
          ],
          [
            30,
            37
          ],
          [
            60,
            20
          ],
          [
            80,
            15
          ],
          [
            97,
            20
          ],
          [
            114,
            28
          ],
          [
            127,
            38
          ],
          [
            120,
            47
          ],
          [
            100,
            60
          ],
          [
            70,
            70
          ],
          [
            47,
            72
          ],
          [
            27,
            66
          ],
          [
            12,
            58
          ]
        ],
        "SE": [
          [
            13,
            15
          ],
          [
            25,
            8
          ],
          [
            43,
            12
          ],
          [
            64,
            24
          ],
          [
            85,
            35
          ],
          [
            110,
            44
          ],
          [
            125,
            48
          ],
          [
            123,
            54
          ],
          [
            111,
            60
          ],
          [
            91,
            63
          ],
          [
            72,
            59
          ],
          [
            52,
            52
          ],
          [
            31,
            41
          ],
          [
            17,
            28
          ]
        ],
        "SW": [
          [
            14,
            43
          ],
          [
            30,
            39
          ],
          [
            53,
            27
          ],
          [
            77,
            12
          ],
          [
            94,
            6
          ],
          [
            113,
            6
          ],
          [
            126,
            14
          ],
          [
            128,
            26
          ],
          [
            123,
            36
          ],
          [
            111,
            48
          ],
          [
            91,
            57
          ],
          [
            71,
            62
          ],
          [
            52,
            64
          ],
          [
            31,
            59
          ],
          [
            17,
            51
          ]
        ],
        "NW": [
          [
            15,
            28
          ],
          [
            30,
            18
          ],
          [
            45,
            16
          ],
          [
            65,
            26
          ],
          [
            86,
            39
          ],
          [
            108,
            48
          ],
          [
            127,
            53
          ],
          [
            130,
            60
          ],
          [
            120,
            66
          ],
          [
            100,
            72
          ],
          [
            80,
            70
          ],
          [
            60,
            62
          ],
          [
            38,
            51
          ],
          [
            20,
            40
          ]
        ]
      }
    },
    "endAppearance": {
      "state": 3,
      "durationMs": 250,
      "layers": []
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
    "note": "Fixed casing/stand/keyboard; original native screen frames clipped to the display only, including power-on. Back views stay still.",
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
      },
      "regions": {
        "NE": [],
        "SE": [
          [
            51,
            27
          ],
          [
            81,
            12
          ],
          [
            81,
            38
          ],
          [
            80,
            39
          ],
          [
            69,
            45
          ],
          [
            61,
            49
          ],
          [
            52,
            53
          ],
          [
            51,
            53
          ]
        ],
        "SW": [
          [
            37,
            39
          ],
          [
            38,
            39
          ],
          [
            66,
            53
          ],
          [
            67,
            54
          ],
          [
            67,
            80
          ],
          [
            52,
            73
          ],
          [
            37,
            65
          ]
        ],
        "NW": []
      },
      "nativeRegions": {
        "NE": [],
        "SE": [
          [
            51,
            27
          ],
          [
            81,
            12
          ],
          [
            81,
            38
          ],
          [
            80,
            39
          ],
          [
            69,
            45
          ],
          [
            61,
            49
          ],
          [
            52,
            53
          ],
          [
            51,
            53
          ]
        ],
        "SW": [
          [
            37,
            39
          ],
          [
            38,
            39
          ],
          [
            66,
            53
          ],
          [
            67,
            54
          ],
          [
            67,
            80
          ],
          [
            52,
            73
          ],
          [
            37,
            65
          ]
        ],
        "NW": []
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
        "event": "fire_burning",
        "loop": true,
        "gain": 0.75
      }
    },
    "note": "Match and metallic ignition/grate event play once each. A longer supplied burning-fire excerpt loops afterward, with a crossfaded seam.",
    "hint": "Match and ignition once, then a steady fire.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1050,
          "layers": [],
          "sound": {
            "event": "match_strike",
            "loop": false
          }
        },
        {
          "state": 1,
          "durationMs": 1400,
          "layers": [],
          "sound": {
            "event": "fireplace_on",
            "loop": false
          }
        }
      ]
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
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
        "loop": true
      }
    },
    "note": "Running water audio loops continuously, including clicks. No duplicated snow/decoration layer; original rim remains fixed.",
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
      "preserveAmbient": true
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "durationMs": 250,
        "layers": []
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
    "note": "All six supplied door states checked. No stocked variant or food-content layer exists in this export; retain the available interior.",
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
      }
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "durationMs": 250,
        "layers": []
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "durationMs": 250,
        "layers": []
      }
    }
  },
  "663eaffc": {
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
        "event": "bed_vibrate",
        "loop": false
      }
    },
    "note": "All appearances locked to the unoccupied made bed. Existing coin/motor/bed interaction sounds retained.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 650,
          "layers": []
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
          "layers": []
        }
      ],
      "sound": {
        "event": "bed_make",
        "loop": false
      }
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
      },
      "lockBody": true
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "durationMs": 250,
        "layers": []
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "durationMs": 250,
        "layers": []
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "durationMs": 250,
        "layers": []
      }
    }
  },
  "f718d902": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
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
        },
        {
          "state": 0,
          "durationMs": 240,
          "layers": [
            7
          ]
        },
        {
          "state": 0,
          "durationMs": 240,
          "layers": [
            8
          ]
        },
        {
          "state": 0,
          "durationMs": 240,
          "layers": [
            9
          ]
        }
      ],
      "loop": true,
      "sound": {
        "event": "bubblemaker_bubble",
        "loop": false
      }
    },
    "note": "Whole machine stays on g0. Only bubble layers 4\u20139 animate; baked hoses are not drawn twice. Fixed scene bounds reserve bubble headroom and prevent clipping or camera changes.",
    "hint": "Click for a burst of bubbles.",
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 220,
          "layers": [
            4
          ]
        },
        {
          "state": 0,
          "durationMs": 220,
          "layers": [
            5
          ]
        },
        {
          "state": 0,
          "durationMs": 220,
          "layers": [
            6
          ]
        },
        {
          "state": 0,
          "durationMs": 220,
          "layers": [
            7
          ]
        },
        {
          "state": 0,
          "durationMs": 220,
          "layers": [
            8
          ]
        },
        {
          "state": 0,
          "durationMs": 220,
          "layers": [
            9
          ]
        }
      ],
      "preserveAmbient": true
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
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
          "durationMs": 160,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 160,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 160,
          "layers": []
        },
        {
          "state": 1,
          "durationMs": 160,
          "layers": []
        }
      ],
      "loop": true,
      "sound": {
        "event": "bull_loop",
        "loop": true
      }
    },
    "note": "Use only the three poses with a bull (0,1,2,1); never the empty-mount frame 3. Smooth rhythmic loop and constant scale.",
    "hint": "Click to set the bull moving.",
    "click": {
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
          "state": 1,
          "durationMs": 180,
          "layers": []
        }
      ],
      "preserveAmbient": true
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "durationMs": 250,
        "layers": []
      }
    }
  },
  "4126d70f": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": [],
      "appearance": "off"
    },
    "active": {
      "steps": [
        {
          "state": 1,
          "durationMs": 175,
          "layers": [],
          "appearance": "on"
        },
        {
          "state": 2,
          "durationMs": 175,
          "layers": [],
          "appearance": "on"
        },
        {
          "state": 3,
          "durationMs": 175,
          "layers": [],
          "appearance": "on"
        },
        {
          "state": 4,
          "durationMs": 175,
          "layers": [],
          "appearance": "on"
        },
        {
          "state": 5,
          "durationMs": 175,
          "layers": [],
          "appearance": "on"
        },
        {
          "state": 4,
          "durationMs": 175,
          "layers": [],
          "appearance": "on"
        },
        {
          "state": 3,
          "durationMs": 175,
          "layers": [],
          "appearance": "on"
        },
        {
          "state": 2,
          "durationMs": 175,
          "layers": [],
          "appearance": "on"
        }
      ],
      "loop": true
    },
    "note": "Switch-on sound/lighting once; hula dancer loops indefinitely while the timer runs. Fixed shade and base; Pause/Resume does not replay activation.",
    "hint": "Rotate to see the other sides.",
    "start": {
      "steps": [
        {
          "state": 1,
          "durationMs": 120,
          "layers": [],
          "appearance": "on",
          "sound": {
            "event": "lamp_turnon_click",
            "loop": false
          }
        }
      ]
    },
    "stop": {
      "steps": [
        {
          "state": 0,
          "durationMs": 100,
          "layers": [],
          "appearance": "off",
          "sound": {
            "event": "lamp_turnoff_click",
            "loop": false
          }
        }
      ]
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
      },
      "phaseBases": {
        "off": {
          "state": 0,
          "layers": []
        },
        "on": {
          "state": 1,
          "layers": []
        }
      },
      "regions": {
        "NE": [
          [
            3,
            32
          ],
          [
            35,
            32
          ],
          [
            35,
            66
          ],
          [
            3,
            66
          ]
        ],
        "SE": [
          [
            3,
            32
          ],
          [
            35,
            32
          ],
          [
            35,
            66
          ],
          [
            3,
            66
          ]
        ],
        "SW": [
          [
            3,
            32
          ],
          [
            35,
            32
          ],
          [
            35,
            66
          ],
          [
            3,
            66
          ]
        ],
        "NW": [
          [
            3,
            32
          ],
          [
            35,
            32
          ],
          [
            35,
            66
          ],
          [
            3,
            66
          ]
        ]
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
        "loop": true
      }
    },
    "note": "Running aquarium audio loops for the running timer.",
    "hint": "Rotate to see the other sides.",
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
      }
    }
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
    "hint": "Rotate to see the other sides.",
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "durationMs": 250,
        "layers": []
      }
    }
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
        "loop": true
      }
    },
    "note": "Running water audio loops continuously, including clicks. No duplicated snow/decoration layer; original rim remains fixed.",
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
      "preserveAmbient": true
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
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
    "note": "The second exported counter graphic is empty. Keep the visible counter while the interaction sounds play.",
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
        "loop": true
      }
    },
    "note": "Running water audio loops continuously, including clicks. No duplicated snow/decoration layer; original rim remains fixed.",
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
      "preserveAmbient": true
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
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
    "note": "Splash only on activation/click. No diving-board bounce event.",
    "hint": "Click for a splash.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 2800,
          "layers": []
        }
      ],
      "sound": {
        "event": "pool_dvboard_splash",
        "loop": false
      }
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 2800,
          "layers": []
        }
      ],
      "sound": {
        "event": "pool_dvboard_splash",
        "loop": false
      }
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
      }
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
    "hint": "Rotate to see the other sides.",
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "durationMs": 250,
        "extraStates": [
          1
        ],
        "layers": []
      }
    }
  },
  "8613a26a": {
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
          "state": 0,
          "durationMs": 230,
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 230,
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 230,
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 230,
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 230,
          "layers": []
        }
      ],
      "loop": true,
      "sound": {
        "event": "phone_ring_pay",
        "loop": false
      }
    },
    "note": "The phone booth stays on one fixed base pose while ringing/answering audio plays. No second booth layer, stretching roof or lifted duplicate.",
    "hint": "Click to pick up and dial.",
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 500,
          "sound": {
            "event": "phone1_spickup",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 1200,
          "sound": {
            "event": "phone_dial",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 700,
          "sound": {
            "event": "phone_ring_receiver",
            "loop": false
          },
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 550,
          "sound": {
            "event": "phone_hangup",
            "loop": false
          },
          "layers": []
        }
      ]
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
      },
      "lockBody": true
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
        "event": "scuba_loop",
        "loop": true
      }
    },
    "note": "Cabin and door stay fixed on state 0, with no duplicate default parts. Scuba machinery audio loops.",
    "hint": "The cabin stays closed while its machinery runs.",
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
      }
    }
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
        "loop": true
      }
    },
    "note": "Running water audio loops continuously, including clicks. No duplicated snow/decoration layer; original rim remains fixed.",
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
      "preserveAmbient": true
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
      }
    }
  },
  "bb0846ea": {
    "idle": {
      "state": 4,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 4,
          "durationMs": 190,
          "layers": []
        },
        {
          "state": 5,
          "durationMs": 190,
          "layers": []
        },
        {
          "state": 6,
          "durationMs": 190,
          "layers": []
        },
        {
          "state": 7,
          "durationMs": 190,
          "layers": []
        }
      ],
      "loop": true,
      "sound": {
        "event": "fountainhd_loop",
        "loop": true
      }
    },
    "note": "Only night states 4\u20137 are used, including idle and coin interaction. Water moves without switching day/night lighting.",
    "hint": "Click the object to interact.",
    "click": {
      "steps": [
        {
          "state": 4,
          "durationMs": 650,
          "layers": []
        }
      ],
      "sound": {
        "event": "fountainhd_coin",
        "loop": false
      }
    },
    "render": {
      "stable": true,
      "base": {
        "state": 4,
        "layers": []
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "durationMs": 250,
        "layers": []
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
        "loop": true
      }
    },
    "note": "Only native door geometry replaces the moving area; the body never morphs. Steam audio loops after the door sequence.",
    "hint": "Click to open and close the steamer.",
    "start": {
      "steps": [
        {
          "state": 1,
          "durationMs": 180,
          "layers": [],
          "sound": {
            "event": "chair_recline",
            "loop": false
          }
        },
        {
          "state": 2,
          "durationMs": 180,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 650,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 180,
          "layers": [],
          "sound": {
            "event": "chair_recline",
            "loop": false
          }
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
        }
      ]
    },
    "click": {
      "steps": [
        {
          "state": 1,
          "durationMs": 180,
          "layers": [],
          "sound": {
            "event": "chair_recline",
            "loop": false
          }
        },
        {
          "state": 2,
          "durationMs": 180,
          "layers": []
        },
        {
          "state": 3,
          "durationMs": 650,
          "layers": []
        },
        {
          "state": 2,
          "durationMs": 180,
          "layers": [],
          "sound": {
            "event": "chair_recline",
            "loop": false
          }
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
        }
      ]
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
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
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 480,
          "layers": [
            4
          ]
        },
        {
          "state": 0,
          "durationMs": 480,
          "layers": [
            5
          ]
        }
      ],
      "loop": true,
      "sound": {
        "event": "mudbath_glubglop_a",
        "loop": true,
        "gain": 0.4
      }
    },
    "note": "Mud layers 0\u20135 rise from low to high; brown fill stream only during startup. Mud is clipped to the inside opening and behind the native tap/towel. Mud sounds replace the milky-water clips.",
    "hint": "Click to fill the tub with mud.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 250,
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 1480,
          "layers": [
            0,
            18
          ],
          "sound": {
            "event": "mudbath_fill",
            "loop": false,
            "channel": "water"
          }
        },
        {
          "state": 0,
          "durationMs": 1480,
          "layers": [
            1,
            19
          ]
        },
        {
          "state": 0,
          "durationMs": 1480,
          "layers": [
            2,
            20
          ]
        },
        {
          "state": 0,
          "durationMs": 1480,
          "layers": [
            3,
            18
          ]
        },
        {
          "state": 0,
          "durationMs": 1480,
          "layers": [
            4,
            19
          ]
        },
        {
          "state": 0,
          "durationMs": 1480,
          "layers": [
            5,
            20
          ]
        }
      ]
    },
    "stop": {
      "steps": [
        {
          "state": 0,
          "durationMs": 1700,
          "layers": [
            4
          ],
          "sound": {
            "event": "mudbath_drain",
            "loop": false,
            "channel": "water"
          }
        },
        {
          "state": 0,
          "durationMs": 1700,
          "layers": [
            2
          ]
        },
        {
          "state": 0,
          "durationMs": 1700,
          "layers": [
            0
          ]
        }
      ]
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
      },
      "layerClip": {
        "indices": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17
        ],
        "regions": {
          "NE": [
            [
              28,
              69
            ],
            [
              66,
              47
            ],
            [
              162,
              99
            ],
            [
              123,
              116
            ]
          ],
          "SE": [
            [
              28,
              97
            ],
            [
              119,
              48
            ],
            [
              162,
              70
            ],
            [
              68,
              117
            ]
          ],
          "SW": [
            [
              29,
              43
            ],
            [
              67,
              22
            ],
            [
              162,
              73
            ],
            [
              125,
              93
            ]
          ],
          "NW": [
            [
              29,
              71
            ],
            [
              124,
              23
            ],
            [
              163,
              44
            ],
            [
              68,
              94
            ]
          ]
        }
      },
      "protect": [
        "gold",
        "blue"
      ]
    },
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 250,
          "layers": []
        },
        {
          "state": 0,
          "durationMs": 1480,
          "layers": [
            0,
            18
          ],
          "sound": {
            "event": "mudbath_fill",
            "loop": false,
            "channel": "water"
          }
        },
        {
          "state": 0,
          "durationMs": 1480,
          "layers": [
            1,
            19
          ]
        },
        {
          "state": 0,
          "durationMs": 1480,
          "layers": [
            2,
            20
          ]
        },
        {
          "state": 0,
          "durationMs": 1480,
          "layers": [
            3,
            18
          ]
        },
        {
          "state": 0,
          "durationMs": 1480,
          "layers": [
            4,
            19
          ]
        },
        {
          "state": 0,
          "durationMs": 1480,
          "layers": [
            5,
            20
          ]
        }
      ],
      "returnAppearance": {
        "state": 0,
        "layers": [
          4
        ]
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
    "note": "Fixed casing/stand/keyboard; original native screen frames clipped to the display only, including power-on. Back views stay still.",
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
      },
      "regions": {
        "NE": [],
        "SE": [
          [
            20,
            66
          ],
          [
            22,
            64
          ],
          [
            114,
            18
          ],
          [
            115,
            18
          ],
          [
            115,
            79
          ],
          [
            114,
            80
          ],
          [
            26,
            124
          ],
          [
            21,
            126
          ],
          [
            20,
            121
          ]
        ],
        "SW": [
          [
            15,
            18
          ],
          [
            16,
            18
          ],
          [
            108,
            64
          ],
          [
            110,
            66
          ],
          [
            110,
            121
          ],
          [
            109,
            126
          ],
          [
            104,
            124
          ],
          [
            16,
            80
          ],
          [
            15,
            79
          ]
        ],
        "NW": []
      },
      "nativeRegions": {
        "NE": [],
        "SE": [
          [
            20,
            66
          ],
          [
            22,
            64
          ],
          [
            114,
            18
          ],
          [
            115,
            18
          ],
          [
            115,
            79
          ],
          [
            114,
            80
          ],
          [
            26,
            124
          ],
          [
            21,
            126
          ],
          [
            20,
            121
          ]
        ],
        "SW": [
          [
            15,
            18
          ],
          [
            16,
            18
          ],
          [
            108,
            64
          ],
          [
            110,
            66
          ],
          [
            110,
            121
          ],
          [
            109,
            126
          ],
          [
            104,
            124
          ],
          [
            16,
            80
          ],
          [
            15,
            79
          ]
        ],
        "NW": []
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
    "note": "Fixed casing/stand/keyboard; original native screen frames clipped to the display only, including power-on. Back views stay still.",
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
      },
      "regions": {
        "NE": [],
        "SE": [
          [
            27,
            32
          ],
          [
            28,
            31
          ],
          [
            68,
            12
          ],
          [
            69,
            17
          ],
          [
            69,
            43
          ],
          [
            67,
            49
          ],
          [
            66,
            50
          ],
          [
            56,
            57
          ],
          [
            53,
            59
          ],
          [
            45,
            63
          ],
          [
            33,
            68
          ],
          [
            30,
            69
          ],
          [
            29,
            69
          ],
          [
            27,
            33
          ]
        ],
        "SW": [
          [
            7,
            17
          ],
          [
            8,
            12
          ],
          [
            48,
            31
          ],
          [
            49,
            32
          ],
          [
            49,
            33
          ],
          [
            47,
            69
          ],
          [
            46,
            69
          ],
          [
            43,
            68
          ],
          [
            31,
            63
          ],
          [
            23,
            59
          ],
          [
            20,
            57
          ],
          [
            10,
            50
          ],
          [
            9,
            49
          ],
          [
            7,
            43
          ]
        ],
        "NW": []
      },
      "nativeRegions": {
        "NE": [],
        "SE": [
          [
            27,
            32
          ],
          [
            28,
            31
          ],
          [
            68,
            12
          ],
          [
            69,
            17
          ],
          [
            69,
            43
          ],
          [
            67,
            49
          ],
          [
            66,
            50
          ],
          [
            56,
            57
          ],
          [
            53,
            59
          ],
          [
            45,
            63
          ],
          [
            33,
            68
          ],
          [
            30,
            69
          ],
          [
            29,
            69
          ],
          [
            27,
            33
          ]
        ],
        "SW": [
          [
            7,
            17
          ],
          [
            8,
            12
          ],
          [
            48,
            31
          ],
          [
            49,
            32
          ],
          [
            49,
            33
          ],
          [
            47,
            69
          ],
          [
            46,
            69
          ],
          [
            43,
            68
          ],
          [
            31,
            63
          ],
          [
            23,
            59
          ],
          [
            20,
            57
          ],
          [
            10,
            50
          ],
          [
            9,
            49
          ],
          [
            7,
            43
          ]
        ],
        "NW": []
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
    "note": "Fixed casing/stand/keyboard; original native screen frames clipped to the display only, including power-on. Back views stay still.",
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
      },
      "regions": {
        "NE": [],
        "SE": [
          [
            15,
            61
          ],
          [
            16,
            60
          ],
          [
            33,
            51
          ],
          [
            103,
            16
          ],
          [
            106,
            15
          ],
          [
            107,
            15
          ],
          [
            107,
            75
          ],
          [
            105,
            77
          ],
          [
            22,
            119
          ],
          [
            19,
            120
          ],
          [
            15,
            121
          ]
        ],
        "SW": [
          [
            10,
            15
          ],
          [
            11,
            15
          ],
          [
            14,
            16
          ],
          [
            84,
            51
          ],
          [
            101,
            60
          ],
          [
            102,
            61
          ],
          [
            102,
            121
          ],
          [
            98,
            120
          ],
          [
            95,
            119
          ],
          [
            12,
            77
          ],
          [
            10,
            75
          ]
        ],
        "NW": []
      },
      "nativeRegions": {
        "NE": [],
        "SE": [
          [
            15,
            61
          ],
          [
            16,
            60
          ],
          [
            33,
            51
          ],
          [
            103,
            16
          ],
          [
            106,
            15
          ],
          [
            107,
            15
          ],
          [
            107,
            75
          ],
          [
            105,
            77
          ],
          [
            22,
            119
          ],
          [
            19,
            120
          ],
          [
            15,
            121
          ]
        ],
        "SW": [
          [
            10,
            15
          ],
          [
            11,
            15
          ],
          [
            14,
            16
          ],
          [
            84,
            51
          ],
          [
            101,
            60
          ],
          [
            102,
            61
          ],
          [
            102,
            121
          ],
          [
            98,
            120
          ],
          [
            95,
            119
          ],
          [
            12,
            77
          ],
          [
            10,
            75
          ]
        ],
        "NW": []
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "durationMs": 250,
        "layers": []
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
          "durationMs": 220,
          "layers": [
            0
          ]
        },
        {
          "state": 0,
          "durationMs": 220,
          "layers": [
            3
          ]
        },
        {
          "state": 0,
          "durationMs": 220,
          "layers": [
            4
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
    "note": "Solid cylinder/dome layers 1 and 2 removed. Thin floss layers spin, fitted and clipped inside the bowl behind the support post.",
    "hint": "Rotate to see the other sides.",
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
      },
      "layerClip": {
        "indices": [
          0,
          3,
          4
        ],
        "regions": {
          "NE": [
            [
              29,
              92
            ],
            [
              48,
              85
            ],
            [
              67,
              93
            ],
            [
              66,
              102
            ],
            [
              49,
              106
            ],
            [
              30,
              100
            ]
          ],
          "SE": [
            [
              60,
              95
            ],
            [
              77,
              89
            ],
            [
              94,
              97
            ],
            [
              92,
              103
            ],
            [
              77,
              108
            ],
            [
              61,
              102
            ]
          ],
          "SW": [
            [
              56,
              91
            ],
            [
              77,
              84
            ],
            [
              95,
              93
            ],
            [
              93,
              100
            ],
            [
              77,
              105
            ],
            [
              57,
              98
            ]
          ],
          "NW": [
            [
              28,
              91
            ],
            [
              47,
              84
            ],
            [
              65,
              92
            ],
            [
              64,
              99
            ],
            [
              47,
              105
            ],
            [
              29,
              99
            ]
          ]
        }
      },
      "layerTargets": {
        "indices": [
          0,
          3,
          4
        ],
        "views": {
          "NE": {
            "x": 34,
            "y": 91,
            "width": 28,
            "height": 12
          },
          "SE": {
            "x": 63,
            "y": 95,
            "width": 27,
            "height": 11
          },
          "SW": {
            "x": 62,
            "y": 90,
            "width": 28,
            "height": 12
          },
          "NW": {
            "x": 33,
            "y": 90,
            "width": 28,
            "height": 12
          }
        }
      },
      "protect": [
        "gold"
      ]
    }
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
          "durationMs": 180,
          "layers": [
            4
          ]
        },
        {
          "state": 0,
          "durationMs": 180,
          "layers": [
            5
          ]
        },
        {
          "state": 0,
          "durationMs": 180,
          "layers": [
            6
          ]
        },
        {
          "state": 0,
          "durationMs": 180,
          "layers": [
            7
          ]
        }
      ],
      "loop": true
    },
    "note": "Fixed machine/table and constant scene scale. Only the small blue rotor component cycles; no full-frame zoom from changing overlay bounds.",
    "hint": "Rotate to see the other sides.",
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
      },
      "fixedFit": true
    }
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
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 2400,
          "layers": [],
          "sway": {
            "amplitudeDeg": 1.3,
            "periodMs": 2400,
            "anchorY": 0.85
          }
        }
      ],
      "loop": true,
      "sound": {
        "event": "asp_egg_loop",
        "loop": false
      }
    },
    "note": "A single baked egg and cradle sway gently as one rigid bitmap. No duplicate shell, headphones or broken-shell overlay.",
    "hint": "Click to stir the egg.",
    "click": {
      "steps": [
        {
          "state": 0,
          "durationMs": 180,
          "layers": [],
          "rotation": -1.8,
          "sound": {
            "event": "dragon_nest_hatch",
            "loop": false,
            "gain": 0.65
          }
        },
        {
          "state": 0,
          "durationMs": 180,
          "layers": [],
          "rotation": 1.8
        },
        {
          "state": 0,
          "durationMs": 180,
          "layers": [],
          "rotation": -1
        },
        {
          "state": 0,
          "durationMs": 180,
          "layers": [],
          "rotation": 1
        },
        {
          "state": 0,
          "durationMs": 180,
          "layers": [],
          "rotation": 0
        }
      ],
      "preserveAmbient": true
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
      }
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
    "note": "All appearances locked to the unoccupied made bed. Existing coin/motor/bed interaction sounds retained.",
    "hint": "Click the object to interact.",
    "start": {
      "steps": [
        {
          "state": 0,
          "durationMs": 750,
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
          "durationMs": 1500,
          "layers": []
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
          "state": 0,
          "durationMs": 750,
          "layers": []
        }
      ],
      "sound": {
        "event": "bed_get_out",
        "loop": false
      }
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
      },
      "lockBody": true
    }
  },
  "765bcec0": {
    "idle": {
      "state": 0,
      "durationMs": 250,
      "layers": []
    },
    "active": {
      "steps": [
        {
          "state": 0,
          "durationMs": 420,
          "layers": [
            1
          ],
          "eraseLayers": [
            1
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
          "durationMs": 420,
          "layers": [
            1
          ],
          "eraseLayers": [
            1
          ],
          "layerOffsets": {
            "1": {
              "y": 2
            }
          },
          "sound": {
            "event": "ex_machine_bar_down",
            "loop": false
          }
        },
        {
          "state": 0,
          "durationMs": 420,
          "layers": [
            1
          ],
          "eraseLayers": [
            1
          ],
          "layerOffsets": {
            "1": {
              "y": 4
            }
          },
          "sound": {
            "event": "ex_machine_bar_up",
            "loop": false
          }
        },
        {
          "state": 0,
          "durationMs": 420,
          "layers": [
            1
          ],
          "eraseLayers": [
            1
          ],
          "layerOffsets": {
            "1": {
              "y": 2
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
    "note": "Barrel, lid, table and cup stay fixed. Only one visible dasher moves down/up, clipped at the lid so its hidden shaft cannot draw over the barrel.",
    "hint": "Rotate to see the other sides.",
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
      },
      "layerClip": {
        "indices": [
          1
        ],
        "regions": {
          "NE": [
            [
              0,
              0
            ],
            [
              102,
              0
            ],
            [
              102,
              44
            ],
            [
              0,
              44
            ]
          ],
          "SE": [
            [
              0,
              0
            ],
            [
              87,
              0
            ],
            [
              87,
              48
            ],
            [
              0,
              48
            ]
          ],
          "SW": [
            [
              0,
              0
            ],
            [
              102,
              0
            ],
            [
              102,
              44
            ],
            [
              0,
              44
            ]
          ],
          "NW": [
            [
              0,
              0
            ],
            [
              87,
              0
            ],
            [
              87,
              44
            ],
            [
              0,
              44
            ]
          ]
        }
      },
      "eraseClip": {
        "NE": [
          [
            0,
            0
          ],
          [
            102,
            0
          ],
          [
            102,
            44
          ],
          [
            0,
            44
          ]
        ],
        "SE": [
          [
            0,
            0
          ],
          [
            87,
            0
          ],
          [
            87,
            48
          ],
          [
            0,
            48
          ]
        ],
        "SW": [
          [
            0,
            0
          ],
          [
            102,
            0
          ],
          [
            102,
            44
          ],
          [
            0,
            44
          ]
        ],
        "NW": [
          [
            0,
            0
          ],
          [
            87,
            0
          ],
          [
            87,
            44
          ],
          [
            0,
            44
          ]
        ]
      }
    }
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
        "event": "popcorn_make",
        "loop": false
      }
    },
    "note": "Only popcorn heap layers 0\u20132 animate inside the glass. Burst/ring layers 3\u20134 and already-baked serving cups 5 are not added.",
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "layers": []
      },
      "layerClip": {
        "indices": [
          0,
          1,
          2
        ],
        "regions": {
          "NE": [
            [
              58,
              74
            ],
            [
              141,
              82
            ],
            [
              141,
              116
            ],
            [
              108,
              133
            ],
            [
              60,
              113
            ]
          ],
          "SE": [
            [
              13,
              84
            ],
            [
              94,
              75
            ],
            [
              94,
              110
            ],
            [
              46,
              134
            ],
            [
              13,
              117
            ]
          ],
          "SW": [
            [
              14,
              76
            ],
            [
              85,
              82
            ],
            [
              85,
              126
            ],
            [
              58,
              137
            ],
            [
              14,
              114
            ]
          ],
          "NW": [
            [
              61,
              83
            ],
            [
              141,
              74
            ],
            [
              141,
              114
            ],
            [
              105,
              133
            ],
            [
              61,
              111
            ]
          ]
        }
      },
      "protect": [
        "gold"
      ]
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "durationMs": 250,
        "layers": []
      }
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "durationMs": 250,
        "layers": []
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
      ],
      "fit": "transient"
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "durationMs": 250,
        "layers": []
      },
      "transientOnly": true
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 12,
        "durationMs": 250,
        "layers": []
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 19,
        "durationMs": 250,
        "layers": []
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 33,
        "durationMs": 250,
        "layers": []
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
    },
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "durationMs": 250,
        "layers": []
      }
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
    "hint": "Rotate to see the other sides.",
    "render": {
      "stable": true,
      "base": {
        "state": 0,
        "durationMs": 250,
        "layers": []
      }
    }
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
