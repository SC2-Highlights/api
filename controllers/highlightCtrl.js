module.exports = function(router)
{
    var load = function (req, res) {
        var id = req.params.id;

        res.status(200).json({highlightId: id});
    }

    router.get('/:id', load);

    return router;
}
