module.exports = function(sequelize, Sequalize) {
    const CommentSchema = sequelize.define("Comment", {
        comment: Sequalize.STRING,
        ip: Sequalize.STRING,
        episode_id: Sequalize.INTEGER
    },{
        timestamps: true
    });
    return CommentSchema;
}