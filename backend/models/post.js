module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "post",
        {
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            contents: { type: DataTypes.TEXT(), allowNull: false },
        },
        { timestamps: true }
    );
};
