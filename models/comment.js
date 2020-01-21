"use strict";

module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define(
    "comment",
    {
      comment: DataTypes.TEXT,
      favoriteId: DataTypes.INTEGER
    },
    {
      hooks: {
        beforeCreate: function(comment) {
          // var randWord = Math.floor(Math.random() * pool.length);
          comment.comment =
            comment.comment[0].toUpperCase() + comment.comment.slice(1);
          // var oneStep = comment.comment.split(' ');
          // var randPlace = Math.floor(Math.random() * oneStep.length);
          // oneStep.splice(randPlace,0,pool[randWord]);
          // comment.comment = oneStep.join(' ');
        }
        // afterCreate: function(date){
        //   comment.createdAt = getMonth(comment.createdAt) + " " + getDate(comment.createdAt) + " " getYear(comment.createdAt);
        // }
      }
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          models.comment.belongsTo(models.favorite);
        }
      }
    }
  );
  return comment;
};
