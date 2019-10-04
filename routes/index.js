var express = require('express');
var router = express.Router();
var osu = require('node-os-utils');
const v8 = require('v8');
var cpu = osu.cpu;
var mem = osu.mem;

/* GET home page. */
router.get('/metrics', function (req, res, next) {
    cpu.usage()
        .then(info => {
            var cpuUsage = info;
            cpu.free()
                .then(info2 => {
                    var free_cpu = info2;

                    mem.free()
                        .then(info3 => {
                          console.log(info3);
                          var total_mem = mem.totalMem();
                            res.render('index', {total_physical_size: total_mem / 1073741824,
                                total_available_size: info3.freeMemMb / 1024,
                                free_cpu: free_cpu,
                                cpuUsage: cpuUsage,
                            });
                        });
                });
        });
});

module.exports = router;
