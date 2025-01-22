using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AspNetCoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class fix1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SharedTasks_Tasks_ApplicationTaskTaskId",
                table: "SharedTasks");

            migrationBuilder.DropIndex(
                name: "IX_SharedTasks_ApplicationTaskTaskId",
                table: "SharedTasks");

            migrationBuilder.DropColumn(
                name: "ApplicationTaskTaskId",
                table: "SharedTasks");

            migrationBuilder.RenameColumn(
                name: "TaskId",
                table: "SharedTasks",
                newName: "ApplicationTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_SharedTasks_ApplicationTaskId",
                table: "SharedTasks",
                column: "ApplicationTaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_SharedTasks_Tasks_ApplicationTaskId",
                table: "SharedTasks",
                column: "ApplicationTaskId",
                principalTable: "Tasks",
                principalColumn: "TaskId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SharedTasks_Tasks_ApplicationTaskId",
                table: "SharedTasks");

            migrationBuilder.DropIndex(
                name: "IX_SharedTasks_ApplicationTaskId",
                table: "SharedTasks");

            migrationBuilder.RenameColumn(
                name: "ApplicationTaskId",
                table: "SharedTasks",
                newName: "TaskId");

            migrationBuilder.AddColumn<int>(
                name: "ApplicationTaskTaskId",
                table: "SharedTasks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_SharedTasks_ApplicationTaskTaskId",
                table: "SharedTasks",
                column: "ApplicationTaskTaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_SharedTasks_Tasks_ApplicationTaskTaskId",
                table: "SharedTasks",
                column: "ApplicationTaskTaskId",
                principalTable: "Tasks",
                principalColumn: "TaskId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
