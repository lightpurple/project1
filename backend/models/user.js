module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "user",
        {
            username: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true ,
                primaryKey: true
            },
            password: { type: DataTypes.STRING(100), allowNull: false },
            nickname: { type: DataTypes.STRING(30), allowNull: false },
        },
        { timestamps: true }
    );
};
