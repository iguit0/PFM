const { getUserId } = require('./../utils')

function accounts(parent, args, context, info) {
  const userId = getUserId(ctx)
  return ctx.db.query.accounts({
    where: {
      OR: [{
          user: {
            id: userId
          }
        },
        {
          user: null
        }
      ],
    },
    orderBy: 'description_ASC'
  }, info)
}

function user(parent, args, context, info) {
  const userId = getUserId(ctx)
  return context.db.query.user({
    where: {
      id: userId
    }
  }, info)
}

module.exports = {
  accounts,
  user
}